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
          const realMonth = monthIndex/12
          añosData[situacion][comuna].push(  Number(months[monthIndex]) );
        }
    
       
      }
    } catch (e) {
      console.log("error", situacion, año);
    }
  }
}


const convertIndexToMonthAndYear = (index) => {

  const year = Math.floor(index/12)+ 2017
  const month = 1+index%12
  return {month,year}
}
//console.log(añosData);

// remove files in folder predictions 
fs.rmSync("./predictions", { recursive: true, force: true });
// make dir predictions
fs.mkdirSync("./predictions");

for (const situacion in añosData) {
  for (const comuna in añosData[situacion]) {
    var net = new brain.recurrent.GRUTimeStep({
      // only positive numbers 
inputRange: [0, 200],      

});


    net.train(
  [   [... añosData[situacion][comuna] ]]
    );

// many results

    const output = net.forecast(añosData[situacion][comuna], añosParaPredecir);
    console.log(output)
      añosData[situacion][comuna].push( 
      ...  
       output.map(a=>Math.max(Math.round(a),0))
        
      )
    


    let data = "x,y\n";
    for (const monthsIndex in añosData[situacion][comuna]) {
   
      
      const {month,year}= convertIndexToMonthAndYear(monthsIndex)

      data +=
        month+'-' + year +
        "," +
         añosData[situacion][comuna][monthsIndex] +
        "\n";
    }
    fs.writeFileSync(
      "./predictions/" + situacion + "-" + comuna + ".csv",
      data
    );
  }
}
