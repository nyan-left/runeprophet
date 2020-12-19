/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getTradeVolume>>;
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
const MyStockChart = (props : { data? : TradeStatsDetails }) => {
  const { data } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={{
        legend: {
          align: 'right',
          verticalAlign: 'left',
          layout: 'vertical',
        },
        credits: {
          enabled: false,
        },
        title: {
          text: 'Price and Trade Volume',
        },
        xAxis: [{
          type: 'datetime',
          tickInterval: 1000 * 3600 * 24 * 30,
        }],
        yAxis: [
          {
            labels: {
              style: {
              },
            },
            title: {
              text: 'Price',
              style: {
              },
            },
          }, {
            title: {
              text: 'Trade volume',
            },

            opposite: true,
          },
        ],
        tooltip: {
          shared: true,
        },
        series: [
          {
            color: 'green',
            name: 'daily price',
            tooltip: {
              valueSuffix: ' gp',
            },
            zIndex: 10,
            data: data?.map((d) => [d.date.getTime(), d.priceDaily]),
          },
          {
            color: 'red',
            name: 'average price',
            type: 'line',
            tooltip: {
              valueSuffix: ' gp',
            },
            zIndex: 9,
            data: data?.map((d) => [d.date.getTime(), d.priceAverage]),
          },
          {
            color: 'lightgray',
            name: 'trade volume',
            type: 'line',
            yAxis: 1,
            data: data?.map((d) => [d.date.getTime(), d.tradeVolume]),
          },
        ],
      }}
    />
  );
};

export default MyStockChart;
