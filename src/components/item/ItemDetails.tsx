/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  useParams,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

type TradeStatsDetails = Await<ReturnType<typeof OSRS.getTradeVolume>>;

function DataLoader(props :{ id: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TradeStatsDetails>();
  const { id } = props;
  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true) && id;
      try {
        const response = await OSRS.getTradeVolume(id);
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

  return isLoading ? <div>Loading</div> : (
    <div>
      {data?.map((item) => <small key={item.dateString}>{`${item.dateString} trade-volume: ${item.tradeVolume}, `}</small>)}
    </div>
  );
}

function Item() {
  const { id } = useParams<any>();
  return (
    <div>
      <DataLoader id={id} />
    </div>
  );
}

export default Item;
