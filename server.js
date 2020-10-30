var express = require("express")
var app = express();
var PORT = process.env.PORT || 8080;
var apiRoutes = require("./routes/api-routes.js")
var db = require("./models");
const exphbs = require('express-handlebars');
const request = require("request");
const cheerio = require("cheerio");

//Set handlebars as vewing engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Contents of public folder are now staticly served
app.use(express.static("public"));

// require("./routes/api-routes.js")(app)
app.use(apiRoutes)


db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});

request("https://www.navysealfoundation.org/our-fallen-heroes/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        // const fallenHeroContainer = $(".fallen-hero-item")
        // var fallenHeroArr = []
        // var fallenHeroInd = $(".fallen-container").find("div")
        $(".fallen-hero-item").each(function (i, res) {
            // console.log(res)

            var fallenSeal = {}

            fallenSeal.name = $(this).find('h6').text();
            fallenSeal.rank = $(this).find('.fallen-hero-rank').text();
            fallenSeal.dod = $(this).find('.fallen-hero-death').text();
            fallenSeal.pod = $(this).find('.fallen-hero-location').text();
            fallenSeal.img = $(this).find('image-container').attr();
            console.log(fallenSeal)

        }
        )
    }
});