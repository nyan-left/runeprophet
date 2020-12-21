/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import * as OSRS from 'osrs-trade-stats';
import getSMA from './SMA';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;
export type OsrsboxItem = Await<ReturnType<typeof OSRS.getFromOsrsBox>>;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
const Chart = (props : { data? : TradeStatsDetails, id : number }) => {
  const { data, id } = props;

  const [osrsboxItem, setOsrsBoxItem] = useState<OsrsboxItem>();

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      try {
        const response = await OSRS.getFromOsrsBox(id);
        !didCancel && setOsrsBoxItem(response);
      } catch (error) {
        // Do something with error
      }
    }
    fetchData();
    return () => { didCancel = true; };
  }, [id]);

  const options = {
    credits: { enabled: false },
    rangeSelector: {
      selected: 1,
    },

    title: {
      useHTML: true,
      text: `<img src="data:image/jpeg;base64,${osrsboxItem?.icon}"/> ${osrsboxItem?.name}`,
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'price (gp)',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Trade Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        color: 'green',
        type: 'line',
        name: 'Daily Price',
        data: data?.map((d) => [d.date, d.priceDaily]),
        tooltip: { valueSuffix: ' gp' },
        yAxis: 0,
      },
      {
        color: 'lightblue',
        type: 'line',
        name: 'Average',
        data: getSMA(data as TradeStatsDetails, 30),
        tooltip: { valueSuffix: ' gp' },
        yAxis: 0,
      },
      {
        color: 'orange',
        type: 'areaspline',
        name: 'Trade Volume',
        data: data?.map((d) => [d.date, d.tradeVolume]),
        yAxis: 1,
      },
    ],
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    </div>

  );
};

export default Chart;
