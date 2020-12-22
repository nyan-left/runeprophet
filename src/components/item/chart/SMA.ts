/* eslint-disable no-continue */
import * as OSRS from 'osrs-trade-stats';

type Await<T> = T extends {
    // eslint-disable-next-line no-unused-vars
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;
type Config = {
  type : 'priceDaily' | 'tradeVolume',
  period : number
}

const getSMA = (data : TradeStatsDetails, config : Config = { type: 'priceDaily', period: 30 }) => {
  const averages = [];
  let sumForAverage = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < (data as any).length; i++) {
    sumForAverage += (data as any)[i][config.type] || 0;
    if (i < config.period) {
      averages.push([]);
    } else {
      sumForAverage -= (data as any)[i - config.period][config.type] || null;
      averages.push([(data as any)[i].date, sumForAverage / config.period || null]);
    }
  }
  return averages;
};

export default getSMA;
