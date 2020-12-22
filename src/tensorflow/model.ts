/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import * as tf from '@tensorflow/tfjs';

async function trainModel(
  X: number[][],
  Y: number[],
  callback: (arg0: number, arg1: tf.Logs | undefined) => void,
  n_epochs : number = 25,
  window_size: number = 7,
  learning_rate: number = 0.01,
  n_layers: number = 4,
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

export default trainModel;

function makePredictions(X : any[], model : tf.Sequential) {
  const predictedResults = (model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))) as tf.Tensor<tf.Rank>).mul(10);
  return Array.from(predictedResults.dataSync());
}
