const brain = require('brain.js');
const net = new brain.NeuralNetwork();

net.train([
    { input: {year:2*0}, output: {delitos:  1/10} },
    { input: {year:2*0.1}, output: {delitos:2/10} },
    { input: {year:2*0.2}, output: {delitos:3/10} },
    { input: {year:2*0.3}, output: {delitos:4/10} },
    
   
],{
    log: true,
    iterations: 1e7,
    errorThresh: 0.00001
});


let result = net.run( 
    {year:2*0.5},
    {year:2*0.6},
    {year:2*0.7}
 )

console.log('predicción ', result);


