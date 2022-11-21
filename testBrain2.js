const brain = require('brain.js');
// timestep
var net1 = new brain.recurrent.RNNTimeStep();
var net2 = new brain.recurrent.LSTMTimeStep();
var net3 = new brain.recurrent.GRUTimeStep();

const training = [1,2,3,4,1,2,3,4,1,2,3,4,1];

net1.train([
  training
]);

net2.train([
  training
]);

net3.train([
  training
]);

const output1 = net1.forecast(training,10);
const output2 = net2.forecast(training,10);
const output3 = net3.forecast(training,10);

const outputRun1 = net1.run(training);
const outputRun2 = net2.run(training);
const outputRun3 = net3.run(training);

console.log('1) Forecast: ', output1);
console.log('2) Forecast: ', output2);
console.log('3) Forecast: ', output3);

console.log('1) Run: ', outputRun1);
console.log('2) Run: ', outputRun2);
console.log('3) Run: ', outputRun3);
