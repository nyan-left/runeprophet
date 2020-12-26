/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';
import Chart from './chart/ChartLoader';
import useStore from '../../store/store';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;

function Item() {
  const { id } = useParams<any>();
  const store = useStore.showGraph((state) => state);
  if (!store.showGraph) return null;
  return (
    <div id="itemPage">
      <Chart id={id} />
    </div>
  );
}

export default Item;
