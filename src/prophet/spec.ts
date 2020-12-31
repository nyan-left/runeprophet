/* eslint-disable camelcase */

export interface ProphetDay {
  ds: string | Date
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
