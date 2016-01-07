/*
See:
http://stackoverflow.com/questions/4057475
http://zurb.com/forrst/posts/Find_the_closest_nearest_HEX_color_of_a_small-JDB

*/

fs = require('fs');

var args = process.argv;

if (args.length < 4)
{
  return console.log("Usage: node hex-var-finder file.less #ffcc00");
}

var file = args[2];
var hexInput = args[3];

if (hexInput.charAt(0) == "#") hexInput = hexInput.substr(1);

var rgbInput = hex2rgb(hexInput);

if (!fs.existsSync(file))
{
  return console.log("Couldn't find file: " + file);
}

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var re = /@([a-z\-]*): #(([0-9]|[a-z])*);/g;

  var min = Number.MAX_VALUE;
  var minName = "-";
  var minHex = "-";

  var count = 0;
  while(result = re.exec(data))
  {
    count ++;

    var name = result[1];
    var hex = result[2];
    var rgb = hex2rgb(hex);

    var dist = find3dDistance(rgb, rgbInput);
    if (dist < min)
    {
      min = dist;
      minName = name;
      minHex = hex;
    }
  }

  console.log("Found var '" + minName + "' (" + minHex + ") in " + count + " variables");
});


function hex2rgb( hex ) {
	var r,g,b;
	if (hex.length == 3)
  {
    r = hex[0];
    g = hex[1];
    b = hex[2];
    r = r + r;
    g = g + g;
    b = b + b;
  } else if (hex.length == 6) {
    r = hex.substr(0,2);
    g = hex.substr(2,2);
    b = hex.substr(4,2);
  }

	r = parseInt( r,16 );
	g = parseInt( g,16 );
	b = parseInt( b ,16);
	return [r,g,b];
}

function find3dDistance(rgb1, rgb2) {
  var dr = rgb1[0] - rgb2[0];
  var dg = rgb1[1] - rgb2[1];
  var db = rgb1[2] - rgb2[2];

  return Math.sqrt((dr * dr) + (dg * dg) + (db * db));
}
