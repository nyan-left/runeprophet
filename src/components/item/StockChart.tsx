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

const MyStockChart = (props : { data? : TradeStatsDetails }) => {
  const { data } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={{
        title: {
          text: 'Price and Trade Volume',
        },
        xAxis: [{
          type: 'datetime',
        }],
        yAxis: [{ // Primary yAxis
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
        }],
        tooltip: {
          shared: true,
        },
        series: [
          {
            name: 'daily price',
            tooltip: {
              valueSuffix: ' gp',
            },
            zIndex: 10,
            data: data?.map((d) => [d.date.getTime(), d.priceDaily]),
          },
          {
            name: 'average price',
            type: 'line',
            tooltip: {
              valueSuffix: ' gp',
            },
            data: data?.map((d) => [d.date.getTime(), d.priceAverage]),
          },
          {
            color: {
              linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1,
              },
              stops: [
                [0, '#ffe1c6'],
                [1, '#ffffff'],
              ],
            },
            name: 'trade volume',
            type: 'areaspline',
            yAxis: 1,
            data: data?.map((d) => [d.date.getTime(), d.tradeVolume]),
          },
        ],
      }}
    />
  );
};

export default MyStockChart;
