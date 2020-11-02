const db = require("../models")
const fs = require("fs")
const fastcsv = require("fast-csv");



var sealStingData = fs.readFileSync(__dirname + "\\seals_db.csv").toString().split("\n")
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Toskiornottoski500!",
      database: "servicemembers"
    });

    // open the connection
    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO servicemembers (id, first_name, last_name, age, branch_of_service, unit, date_of_death,awards, summary_of_service) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    });
  });

  sealStingData.push(csvStream);
  console.log(sealStingData)

