/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';
import Loader from 'react-loader-spinner';
import Chart from './chart/StockChart';
import useStore from '../../store/store';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;

function DataLoader(props :{ id: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TradeStatsDetails>();
  const { id } = props;
  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true) && id;
      try {
        const response = await OSRS.getFromWiki(id);
        !didCancel && setData(response);
      } catch (error) {
        // Do something with error
      } finally {
        !didCancel && setIsLoading(false);
      }
    }
    fetchData();
    return () => { didCancel = true; };
  }, [id]);

  return isLoading ? (
    <div>
      <Loader type="Hearts" color="orange" height={80} width={80} timeout={2000} />
    </div>
  ) : (
    <div>
      <Chart data={data} id={id} />
    </div>
  );
}

function Item() {
  const { id } = useParams<any>();

  const store = useStore.showGraph((state) => state);
  if (!store.showGraph) return null;
  return (
    <div id="itemPage">
      <DataLoader id={id} />
    </div>
  );
}

export default Item;
