const db = require("../models");
const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const { format } = require("mysql");

//GET requests to display various handlebars files
router.get("/", function (req, res) {
    res.render("index");
});

router.get('/SEALs', (req, res) => {
    // we can now use result over calling dbServiceMember
    var result = []

    db.ServiceMember.findAll({

        where: {
            approved: true
        }
    })
        .then((dbServiceMember) => {
            dbServiceMember = dbServiceMember.map(formatDbData)
            function formatSiteData(data) {
                var fallenSeal = {}

                fallenSeal.img = data.find('.image-container').attr('data-src-img')
                fallenSeal.first_name = data.find('h6').text();
                fallenSeal.last_name = "-"
                fallenSeal.age = "-"
                fallenSeal.branch_of_service = "Navy"
                fallenSeal.date_of_birth = "-"
                fallenSeal.unit = data.find('.fallen-hero-rank').text();
                fallenSeal.date_of_death = data.find('.fallen-hero-death').text();
                fallenSeal.awards = "-"
                // this was pod but has been switched to bio for fit format
                fallenSeal.biography = data.find('.fallen-hero-location').text();
                // fallenSeal.biography = "-"
                fallenSeal.summary_of_service = "-"

                // console.log(fallenSeal)
                return fallenSeal
            }
            function formatDbData(data) {
                
                const formatedDbData = data => {
                    const entries = Object.entries(data);
                    entries.forEach(entry => entry[0] = +entry[0]);
                    return entries;
                }              
                // console.log("the big D", data)
                console.log(formatedDbData(data));

            //    console.log(data)
               // format()
                // var fallenSeal = {}

                // fallenSeal.img = data.find('.image-container').attr('data-src-img')
                // fallenSeal.first_name = data.find('h6').text();
                // fallenSeal.last_name = "-"
                // fallenSeal.age = "-"
                // fallenSeal.branch_of_service = "Navy"
                // fallenSeal.date_of_birth = "-"
                // fallenSeal.unit = data.find('.fallen-hero-rank').text();
                // fallenSeal.date_of_death = data.find('.fallen-hero-death').text();
                // fallenSeal.awards = "-"
                // // this was pod but has been switched to bio for fit format
                // fallenSeal.biography = data.find('.fallen-hero-location').text();
                // // fallenSeal.biography = "-"
                // fallenSeal.summary_of_service = "-"

                // // console.log(fallenSeal)
                // return fallenSeal
            }
            request("https://www.navysealfoundation.org/our-fallen-heroes/", (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    // const fallenHeroContainer = $(".fallen-hero-item")
                    var fallenHeroArr = []
                    // var fallenHeroInd = $(".fallen-container").find("div")
                    $(".fallen-hero-item").each(function (i, res) {
                        // console.log(res)

                        // var fallenSeal = {}

                        // fallenSeal.first_name = $(this).find('h6').text();
                        // fallenSeal.unit = $(this).find('.fallen-hero-rank').text();
                        // fallenSeal.date_of_death = $(this).find('.fallen-hero-death').text();
                        // fallenSeal.pod = $(this).find('.fallen-hero-location').text();
                        // // fallenSeal.img = $(this).find('image-container').attr();
                        // fallenSeal.img = $(this).find('.image-container').attr('data-src-img')
                        // fallenSeal.branch_of_service = "Navy"
                        // fallenSeal.biography = "-"
                        // fallenSeal.date_of_birth = "-"
                        // fallenSeal.age = "-"
                        // console.log(fallenSeal)
                        var format = formatSiteData($(this))
                        result.push(format)



                    })
                    console.log(result.slice(1, 3))
                    let obj = {
                        servicemembers: result
                    }
                    res.render('SEALs', obj);
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/creed', (req, res) => {
    res.render('creed');
});

router.get('/api/servicemembers', (req, res) => {
    res.render('addnew');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/admin', (req, res) => {
    db.ServiceMember.findAll({
        where: {
            approved: false
        }
    })
        .then((dbServiceMember) => {
            let obj = {
                servicemembers: dbServiceMember
            }
            res.render('admin', obj);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Post a new members info to the database
router.post("/SEALs", function (req, res) {
    db.ServiceMember.create({
        image: req.body.image,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        branch_of_service: req.body.branch_of_service,
        date_of_birth: req.body.date_of_birth,
        unit: req.body.unit,
        date_of_death: req.body.date_of_death,
        awards: req.body.awards,
        biography: req.body.biography,
        summary_of_service: req.body.summary_of_service

    })
        .then(function (dbServiceMember) {
            res.json(dbServiceMember)
        })
        .catch((err) => {
            console.log(err);
        });
});

//Admin users can delete requested additions
router.delete("/SEALs/:id", function (req, res) {
    db.ServiceMember.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((dbServiceMember) => {
            res.json(dbServiceMember)
        })
        .catch((err) => {
            console.log(err);
        });
});

//Admin users can update status to approved for pending additions
router.put("/SEALs/:id", (req, res) => {
    db.ServiceMember.update({
        approved: req.body.approved
    }, {
        where: {
            id: req.params.id
        }
    })
        .then((dbServiceMember) => {
            res.json(dbServiceMember);
        })
        .catch((err) => {
            console.log(err);
        });
});



module.exports = router