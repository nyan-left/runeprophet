/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import * as OSRS from 'osrs-trade-stats';
import getSMA from './SMA';
import theme from './theme';
import getItemPrediction from '../data/item';

require('highcharts/highcharts-more')(Highcharts);

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;
export type OsrsboxItem = Await<ReturnType<typeof OSRS.getFromOsrsBox>>;
const blankPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
(Highcharts as any).theme = theme;

Highcharts.setOptions(Highcharts.theme);
const StyledChart = (props : { data? : TradeStatsDetails, id : number }) => {
  const { data, id } = props;
  const [predictionData] = useState(getItemPrediction(4151));
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
      text: `<img src="data:image/jpeg;base64,${osrsboxItem?.icon || blankPixel}" style="vertical-align: bottom;"/> ${osrsboxItem?.name || ''}`,
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Price (gp)',
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

    series: [
      {
        color: 'orange',
        type: 'line',
        name: 'Price',
        data: data?.map((d) => [d.date, d.priceDaily]),
        tooltip: { valueSuffix: ' gp', valueDecimals: 0 },
        yAxis: 0,
      },
      {
        color: 'green',
        type: 'areasplinerange',
        name: 'Prediction Range',
        data: predictionData?.map((d) => [new Date(d.ds), d.yhat_lower, d.yhat_upper]),
        tooltip: { valueSuffix: ' gp', valueDecimals: 0 },
        zIndex: -5,
        yAxis: 0,
      },
      {
        color: 'red',
        type: 'line',
        name: 'Prediction',
        data: predictionData?.map((d) => [new Date(d.ds), d.yhat]),
        tooltip: { valueSuffix: ' gp', valueDecimals: 0 },
        zIndex: -2,
        yAxis: 0,
      },
      {
        color: 'orange',
        type: 'areaspline',
        name: 'Volume',
        data: data?.map((d) => [d.date, d.tradeVolume]),
        tooltip: { valueDecimals: 0 },
        yAxis: 1,
      },
      {
        color: 'lightblue',
        type: 'line',
        name: 'Average',
        data: getSMA(data as TradeStatsDetails, { period: 30, type: 'priceDaily' }),
        tooltip: { valueSuffix: ' gp', valueDecimals: 0 },
        zIndex: 1,
        yAxis: 0,
      },
      {
        color: 'lightblue',
        type: 'line',
        name: 'Average',
        data: getSMA(data as TradeStatsDetails, { period: 7, type: 'tradeVolume' }),
        tooltip: { valueDecimals: 0 },
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

export default StyledChart;
