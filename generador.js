// read a file line by line 
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var instream = fs.createReadStream('2020');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);
var lineas = [];


// convert excel alphabet to number
function excelAlphaToNumber(alpha) {
    var i, j, result = 0;
    for (i = 0, j = alpha.length - 1; i < alpha.length; i += 1, j -= 1) {
        result += Math.pow(26, j) * (alpha.charCodeAt(i) - 64);
    }
    return result;
}


rl.on('line', function(line) {
    const rows = line.split("\t");
    console.log(rows);
});
rl.on('close', function() {
    // do something with lineas
    console.log(lineas);
});
// save file 
// fs.writeFile("output.txt", "Hello World!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });