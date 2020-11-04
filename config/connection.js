//Import MySQL and dotenv modules
const mysql = require("mysql");
require("dotenv").config();

let connection;

if (process.env.JAWSDB_URL) {
    //Use jaws db
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    //Use local connection
    //Create connection to local MySQL database
        connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Toskiornottoski500!",
        database: "seals_db"
    });
}


// Run connection to the servicemembers DB
connection.connect((err) => {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection;