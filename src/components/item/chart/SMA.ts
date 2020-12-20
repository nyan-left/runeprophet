import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    // eslint-disable-next-line no-unused-vars
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;

const getSMA = (data : TradeStatsDetails, period = 30) => {
  const averages = [];
  let sumForAverage = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < (data as any).length; i++) {
    sumForAverage += (data as any)[i].priceDaily;
    if (i < period) {
      averages.push([]);
    } else {
      sumForAverage -= (data as any)[i - period].priceDaily;
      averages.push([(data as any)[i].date, sumForAverage / period]);
    }
  }
  return averages;
};

export default getSMA;
