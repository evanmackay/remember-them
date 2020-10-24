var express = require("express")
var app = express();
var PORT = process.env.PORT || 8080;
var apiRoutes = require("./routes/api-routes.js")
var db = require("./models");
const exphbs = require('express-handlebars');

//Set handlebars as vewing engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Contents of public folder are now staticly served
app.use(express.static("public"));

// require("./routes/api-routes.js")(app)
app.use("/api/servicemembers", apiRoutes)



db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT); 
    });
});