// read a file line by line
var fs = require("fs");
var readline = require("readline");
var stream = require("stream");


// convert excel alphabet to number
function excelAlphaToNumber(alpha) {
  var i,
    j,
    result = 0;
  for (i = 0, j = alpha.length - 1; i < alpha.length; i += 1, j -= 1) {
    result += Math.pow(26, j) * (alpha.charCodeAt(i) - 64);
  }
  return result;
}
const ArrayToCSV = (arr, delimiter = ",") =>
  arr
    .map((v) =>
      v
        .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
        .join(delimiter)
    )
    .join("\n");

const comunas = [
  "Santiago",
  "Cerrillos",
  "Cerro Navia",
  "Conchalí",
  "El Bosque",
  "Estación Central",
  "Huechuraba",
  "Independencia",
  "La Cisterna",
  "La Florida",
  "La Granja",
  "La Pintana",
  "La Reina",
  "Las Condes",
  "Lo Barnechea",
  "Lo Espejo",
  "Lo Prado",
  "Macul",
  "Maipú",
  "Ñuñoa",
  "Pedro Aguirre Cerda",
  "Peñalolén",
  "Providencia",
  "Pudahuel",
  "Quilicura",
  "Quinta Normal",
  "Recoleta",
  "Renca",
  "San Joaquín",
  "San Miguel",
  "San Ramón",
  "Vitacura",
  "Puente Alto",
  "Pirque",
  "San José de Maipo",
  "Colina",
  "Lampa",
  "Tiltil",
  "San Bernardo",
  "Buin",
  "Calera de Tango",
  "Paine",
  "Melipilla",
  "Alhué",
  "Curacaví",
  "María Pinto",
  "San Pedro",
  "Talagante",
  "El Monte",
  "Isla de Maipo",
  "Padre Hurtado",
  "Peñaflor",
];
const indices = {
  G: "Ruidos molestos",
  T: "Consumo de alcohol vía pública",
  AG: "Ebriedad",
  AT: "Hurtos",
  BG: "Otros robos con fuerza",
  BT: "Riña pública",
  CG: "Violencia intrafamiliar",
  CT: "Abusos y violaciones",
  DG: "Amenazas",
  DT: "Daños",
  EG: "Lesiones",
  ET: "Robo y receptación",
};

const años = [2017, 2018, 2019, 2020, 2021];

for (const año of años) {
    var lineas = [];

  var instream = fs.createReadStream(String(año));
  var outstream = new stream();
  var rl = readline.createInterface(instream, outstream);

  // leer lineas

  rl.on("line", function (line) {
    lineas.push(line);
  });
  rl.on("close", function () {

    // do something with lineas
    //console.log(lineas);

 

    for (const indice in indices) {

        const matrix = lineas.map((line) => {
            const rows = line.split("\t");
            return rows;
          });
      let result = matrix.map((a) => {
        return a.slice(
          excelAlphaToNumber(indice)-1,
          excelAlphaToNumber(indice) -1 + 12
        );
      }).slice(4,56)
      
      result = result.map((value,index)=>{
        return [comunas[index]||"",...value]
      })

      fs.writeFile(
        `output/${año}-${indices[indice]}.csv`,
        ArrayToCSV(result),
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    }
  });
}

// save file
// fs.writeFile("output.txt", "Hello World!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });
