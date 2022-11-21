const fs = require("fs");
const brain = require("brain.js");

const años = [2017, 2018, 2019, 2020, 2021];
const añosParaPredecir = 5

const situaciones = require("./mapeoSituaciones.js");

const añosData = {};
for (const situacion of Object.values(situaciones)) {
  añosData[situacion] = {};
  for (const año of años) {
    try {
      const csv = fs.readFileSync(
        "./output/" + String(año) + "-" + situacion + ".csv",
        {
          encoding: "utf8",
        }
      );
      for (const line of csv.split("\n")) {

        const months = line.split(",").slice(1);
        const comuna = line.split(",")[0];
        añosData[situacion][comuna] = añosData[situacion][comuna] || [];
        for (const monthIndex in months) {
          añosData[situacion][comuna].push({
            input: {
              month: (Number(monthIndex) + 12 * (Number(año) - 2017)) / 100,
            },
            output: { total: Number(months[monthIndex]) / 200 },
          });
        }
       // if(1) continue 

        //if(1) throw Error(JSON.stringify(  añosData[situacion][comuna]))
       
      }
    } catch (e) {
      console.log("error", situacion, año);
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
    const net = new brain.NeuralNetwork();

    net.train(
      añosData[situacion][comuna],

      {
        log: true,
        iterations:   100,
        //errorThresh:  0.001,
      }
    );

    const monthsPrediccion = Array(12*añosParaPredecir)
      .fill(0).map((el,month)=>{
        return {
            month: (años.length*12 +  month) / 100,
        }
      })
      
    for (const test of monthsPrediccion) {
      let result = net.run(test);
      añosData[situacion][comuna].push({
        input: test,
        output: result,
      });
    }


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
