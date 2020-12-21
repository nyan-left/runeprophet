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
const blankPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;
Highcharts.setOptions({ lang: { thousandsSep: ',' } });
(Highcharts as any).theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
    '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: '#424242',
    style: {
      fontFamily: '\'Unica One\', sans-serif',
    },
    plotBorderColor: '#606063',
  },
  title: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
      fontSize: '20px',
    },
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
    },
  },
  xAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3',
      },
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    title: {
      style: {
        color: '#A0A0A3',
      },
    },
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3',
      },
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#A0A0A3',
      },
    },
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
      color: '#F0F0F0',
    },
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: '#F0F0F3',
        style: {
          fontSize: '13px',
        },
      },
      marker: {
        lineColor: '#333',
      },
    },
    boxplot: {
      fillColor: '#505053',
    },
    candlestick: {
      lineColor: 'white',
    },
    errorbar: {
      color: 'white',
    },
  },
  legend: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    itemStyle: {
      color: '#E0E0E3',
    },
    itemHoverStyle: {
      color: '#FFF',
    },
    itemHiddenStyle: {
      color: '#606063',
    },
    title: {
      style: {
        color: '#C0C0C0',
      },
    },
  },
  credits: {
    style: {
      color: '#666',
    },
  },
  labels: {
    style: {
      color: '#707073',
    },
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3',
    },
    activeDataLabelStyle: {
      color: '#F0F0F3',
    },
  },
  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#505053',
      },
    },
  },
  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#505053',
      stroke: '#000000',
      style: {
        color: '#CCC',
      },
      states: {
        hover: {
          fill: '#707073',
          stroke: '#000000',
          style: {
            color: 'white',
          },
        },
        select: {
          fill: '#000003',
          stroke: '#000000',
          style: {
            color: 'white',
          },
        },
      },
    },
    inputBoxBorderColor: '#505053',
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver',
    },
    labelStyle: {
      color: 'silver',
    },
  },
  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA',
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED',
    },
    xAxis: {
      gridLineColor: '#505053',
    },
  },
  scrollbar: {
    barBackgroundColor: '#808083',
    barBorderColor: '#808083',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: '#606063',
    buttonBorderColor: '#606063',
    rifleColor: '#FFF',
    trackBackgroundColor: '#404043',
    trackBorderColor: '#404043',
  },
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);
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
      text: `<img src="data:image/jpeg;base64,${osrsboxItem?.icon || blankPixel}" style="vertical-align: bottom;"/> ${osrsboxItem?.name || ''}`,
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
