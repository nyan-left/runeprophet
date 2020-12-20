/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;

const getAverage = (arr : TradeStatsDetails, n : number) => {
  let sum = 0;
  if (n > arr.length) {
    n = arr.length;
  }

  for (let i = arr.length - n; i < arr.length; i++) {
    sum += arr[i].priceDaily;
  }
  return sum / n;
};

export default getAverage;
