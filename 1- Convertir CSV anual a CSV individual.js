// read a file line by line
const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

// convert excel alphabet to number
function excelAlphaToNumber(alpha) {
  let i,
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
const situations =  require('./mapeoSituaciones.js');

const años = [2017, 2018, 2019, 2020, 2021];

fs.rmSync("output/*", { force: true });

for (const año of años) {
  const rawColumns = [];

  const instream = fs.createReadStream('input/'+String(año)+'.csv');
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  // leer lineas

  rl.on("line", function (line) {
    rawColumns.push(line);
  });
  rl.on("close", function () {
 
    for (const situation in situations) {
      const columns = rawColumns.map((rawColumns) => {
        const column = rawColumns.split(",");
        return column;
      });
      let selectedColumns = columns
        .map((column) => {
          return column.slice(
            excelAlphaToNumber(situation) - 1,
            excelAlphaToNumber(situation) - 1 + 12
          );
        })
        .slice(4, 56);

      selectedColumns = selectedColumns.map((rows, index) => {
        return [comunas[index] || "", ...rows];
      });

      fs.writeFile(
        `output/${año}-${situations[situation]}.csv`,
        ArrayToCSV(selectedColumns),
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
