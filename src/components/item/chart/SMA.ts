// /* eslint-disable valid-typeof */
// /* eslint-disable no-shadow */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable guard-for-in */
// /* eslint-disable no-plusplus */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-vars */
// import * as OSRS from 'osrs-trade-stats';

// type Await<T> = T extends {
//     then(onfulfilled?: (value: infer U) => unknown): unknown;
// } ? U : T;

// export type TradeStatsDetails = Await<ReturnType<typeof OSRS.getFromWiki>>;

// const movingAverage = (d: TradeStatsDetails, t: number, roundUp: any) => {
//   if (d.length >= t && d.constructor === Array) {
//     const r = []; let s = 0;
//     const f = 1;
//     let ma;

//     roundUp = typeof roundUp === undefined ? true : roundUp;

//     for (let i = 0; i < d.length; ++i) {
//       s += Number.isNaN(d[i].priceDaily) ? 0 : d[i].priceDaily;
//       if (i < t - 1) {
//         r.push(NaN);
//       } else if (i + 1 === t) {
//         ma = roundUp ? Math.round((s / t) * f) / f : s / t;
//         r.push(ma);
//       } else {
//         s -= Number.isNaN(d[i - t].priceDaily) ? 0 : d[i - t].priceDaily;
//         ma = roundUp ? Math.round((s / t) * f) / f : s / t;
//         r.push(ma);
//       }
//     }

//     return r;
//   }
//   // eslint-disable-next-line no-throw-literal
//   throw '[ERROR] TechnicalAnalysis#movingAverage: Not enought data! OR data is not Array!';
// };

// export default movingAverage;
