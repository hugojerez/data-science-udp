const fs = require("fs");
const brain = require("brain.js");

const años = [2017, 2018, 2019, 2020, 2021];
const añosParaPredecir = 5

const situaciones = require("./mapeoSituaciones.js");

const añosData = {};
for (const situación of Object.values(situaciones)) {
  añosData[situación] = {};
  for (const año of años) {
    try {
      const csv = fs.readFileSync(
        "./output/" + String(año) + "-" + situación + ".csv",
        {
          encoding: "utf8",
        }
      );
      for (const line of csv.split("\n")) {
        const net = new brain.NeuralNetwork();

        const months = line.split(",").slice(1);
        const comuna = line.split(",")[0];
        añosData[situación][comuna] = añosData[situación][comuna] || [];
        for (const monthIndex in months) {
          añosData[situación][comuna].push({
            input: {
              month: (Number(monthIndex) + 12 * (Number(año) - 2017)) / 100,
            },
            output: { total: Number(months[monthIndex]) / 200 },
          });
        }
        if(1) continue 

        //if(1) throw Error(JSON.stringify(  añosData[situación][comuna]))
        net.train(
          añosData[situación][comuna],

          {
            log: true,
            iterations: 2 || 1e7,
            errorThresh: 0.1 || 0.00001,
          }
        );

        const monthsPrediccion = Array(12*añosParaPredecir)
          .fill(0).map(month=>{
            return {
              input: {
                month: (2022 * 12 + month) / 100,
              },
            }
          })
          
        for (const test of monthsPrediccion) {
          let result = net.run(test);
          añosData[situación][comuna].push({
            input: test,
            output: result,
          });
        }
      }
    } catch (e) {
      console.log("error", situación, año);
    }
  }
}

console.log(añosData);

// remove files in folder predictions 
fs.rmSync("./predictions", { recursive: true, force: true });
// make dir predictions
fs.mkdirSync("./predictions");

for (const situacion in añosData) {
  for (const comuna in añosData[situacion]) {
    let data = "x,y\n";
    for (const monthsIndex in añosData[situacion][comuna]) {
      let yearmonth = 100 * añosData[situacion][comuna][monthsIndex].input.month;
      let year = Math.floor(yearmonth / 12)+2017;
      let month = 1+yearmonth % 12;
      // pad left with zero month

      yearmonth = String(String(Number(Math.floor(month))).padStart(1, "0") + '-'+String(Number(year)) );

      data +=
        yearmonth +
        "," +
        Math.floor(200 * añosData[situacion][comuna][monthsIndex].output.total) +
        "\n";
    }
    fs.writeFileSync(
      "./predictions/" + situacion + "-" + comuna + ".csv",
      data
    );
  }
}
