/* eslint-disable no-plusplus */
/* eslint-disable import/no-dynamic-require */

import { ProphetDay } from '../../../prophet/spec';
/* eslint-disable global-require */
const getItemPrediction = (id: number) => {
  const jsonData : ProphetDay[] = require(`./${id}.json`);
  // const today = new Date();
  // const futureDate = jsonData.filter((day) => new Date(day.ds) > today);
  return jsonData;
};

export default getItemPrediction;
