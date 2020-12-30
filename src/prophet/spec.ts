/* eslint-disable camelcase */
import * as OSRS from 'osrs-trade-stats';
import axios from 'axios';

OSRS.getFromWiki(OSRS.ITEMS_LIST.Abyssal_whip).then((itemData) => {
  const requestData = itemData.map((item) => ({ ds: item.dateString, y: item.priceDaily }));
  axios.post('http://0.0.0.0:8000', requestData).then((res) => {
    console.log(res.data);
  });
});

export interface Root {
  ds: string
  trend: number
  yhat_lower: number
  yhat_upper: number
  trend_lower: number
  trend_upper: number
  additive_terms: number
  additive_terms_lower: number
  additive_terms_upper: number
  weekly: number
  weekly_lower: number
  weekly_upper: number
  yearly: number
  yearly_lower: number
  yearly_upper: number
  multiplicative_terms: number
  multiplicative_terms_lower: number
  multiplicative_terms_upper: number
  yhat: number
}
