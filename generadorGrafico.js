// save a image with a chart 
var fs = require('fs');
var Canvas = require('canvas');
var Image = Canvas.Image;
var canvas = new Canvas(200, 200);
var ctx = canvas.getContext('2d');
ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);
var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();
var data = canvas.toDataURL();
var img = new Image;
img.src = data;
var out = fs.createWriteStream(__dirname + '/image.png');
var stream = img.pngStream();
stream.on('data', function(chunk){
  out.write(chunk);
});
stream.on('end', function(){
  console.log('saved png');
});
