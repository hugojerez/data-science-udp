const brain = require('brain.js');
// timestep
var net3 = new brain.recurrent.GRUTimeStep();

const training = [1,2,3,4,1,2,3,4,1,2,3,4,1];

net3.train([
  training
]);

//const output3 = net3.forecast(training,3);

const outputRun3 = net3.run([1,2,3,4,1]);

//console.log('3) Forecast: ', output3);

console.log('3) Run: ', outputRun3);
