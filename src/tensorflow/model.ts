/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable camelcase */

import * as OSRS from 'osrs-trade-stats';
import * as tf from '@tensorflow/tfjs';

const normalize = (values : number[], max : number) => values.map((value) => value / max);

type SMAResult = {
    set: {
        price: number;
        timestamp: Date;
    }[];
    avg: number;
}
// some validation data
function ComputeSMA(data : {price : number, timestamp : Date}[], window_size : number) : SMAResult[] {
  const r_avgs = [];
  let avg_prev = 0;
  for (let i = 0; i <= data.length - window_size; i++) {
    let curr_avg = 0.00;
    const t = i + window_size;
    for (let k = i; k < t && k <= data.length; k++) {
      curr_avg += data[k].price / window_size;
    }
    r_avgs.push({
      set: data.slice(i, i + window_size),
      avg: curr_avg,
    });
    avg_prev = curr_avg;
  }
  return r_avgs;
}

const Callback = (epoch: number, log: { loss: any; }) => {
  const n_epochs = 25;
  console.log(`epoch ${epoch + 1} / ${n_epochs}`);
  console.log(`loss: ${log.loss}`);
  console.log(`${Math.ceil(((epoch + 1) * (100 / n_epochs))).toString()}%`);
};




async function trainModel(
  X: number[][],
  Y: number[],
  window_size : number,
  n_epochs : number = 25,
  learning_rate: number = 0.01,
  n_layers: number = 4,
  callback: any,
) {
  const input_layer_shape = window_size;
  const input_layer_neurons = 100;

  const rnn_input_layer_features = 10;
  const rnn_input_layer_timesteps = input_layer_neurons / rnn_input_layer_features;

  const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps];
  const rnn_output_neurons = 20;

  const rnn_batch_size = window_size;

  const output_layer_shape = rnn_output_neurons;
  const output_layer_neurons = 1;

  const model = tf.sequential();

  const xs = tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10));
  const ys = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1]).div(tf.scalar(10));

  model.add(tf.layers.dense({ units: input_layer_neurons, inputShape: [input_layer_shape] }));
  model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));

  const lstm_cells = [];
  for (let index = 0; index < n_layers; index++) {
    lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
  }

  model.add(tf.layers.rnn({
    cell: lstm_cells,
    inputShape: rnn_input_shape,
    returnSequences: false,
  }));

  model.add(tf.layers.dense({ units: output_layer_neurons, inputShape: [output_layer_shape] }));

  model.compile({
    optimizer: tf.train.adam(learning_rate),
    loss: 'meanSquaredError',
  });

  const hist = await model.fit(xs, ys,
    {
      batchSize: rnn_batch_size,
      epochs: n_epochs,
      callbacks: {
        onEpochEnd: async (epoch, log) => {
          callback(epoch, log);
        },
      },
    });

  return { model, stats: hist };
}


function makePredictions(X : any[], model : tf.Sequential) {
  const predictedResults = (model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))) as tf.Tensor<tf.Rank>).mul(10);
  return Array.from(predictedResults.dataSync());
}


async function begin() {
  console.log('starting');
  const window_size = 20;
  const n_epochs = 25;
  const learningrate = 0.01;
  const n_hiddenlayers = 4;
  const data = await OSRS.getFromWiki(4151);
  const pricesArray : number[] = data.map((day) => day.priceDaily);
  const datesArray : Date[] = data.map((day) => new Date(day.date));
  const maxPrice : number = Math.max(...pricesArray);
  const normalizedPrices = normalize(pricesArray, maxPrice);

  const sma_vec = ComputeSMA(data.map((day, i) => ({ timestamp: new Date(day.date), price: normalizedPrices[i] })), window_size);
  const inputs = sma_vec.map((inp_f) => inp_f.set.map((val) => val.price));
  const outputs = sma_vec.map((outp_f) => outp_f.avg);

  // const result = await trainModel(inputs, outputs, window_size, n_epochs, learningrate, n_hiddenlayers, Callback);
  // console.log(result);
  // may need to reverse
}

export default begin;
