const db = require("../models");
const express = require("express");
const router = express.Router();

const request = require("request");
const cheerio = require("cheerio");
const { format } = require("mysql");
const fs = require('fs')
const axios = require('axios')
//GET requests to display various handlebars files
router.get("/", function (req, res) {
    res.render("index");
const nodemailer = require("nodemailer")
require("dotenv").config()


//GET requests to display various handlebars files
router.get("/", function(req, res) {
    db.ServiceMember.findAll({
        where: {
            approved: true
        }
    })
    .then((dbServiceMember) => {
        let arr = []
        for (let i = 0; i < dbServiceMember.length; i++) {
            arr.push(dbServiceMember[i])
        }
        console.log(dbServiceMember)
        let randomServiceMember = arr[Math.floor(Math.random() * arr.length)]
        console.log(randomServiceMember)
        let obj = {
            servicemembers: randomServiceMember
        }
        res.render("index", obj);
    })
    .catch((err) => {
        console.log(err);
    });
    
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
            console.log("before", dbServiceMember)
            dbServiceMember = dbServiceMember.map(formatDbData)
            console.log("after", dbServiceMember)

            function formatSiteData(data, buf) {
                var fallenSeal = {}

                // var buf = fs.readFileSync(data.find('.image-container').attr('data-src-img'))
                // Buffer.isBuffer(buf);
                // console.log("this is the buf", buf)
                fallenSeal.img = buf

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

                console.log(fallenSeal)
                return fallenSeal
            }







            function formatDbData(data) {
                return data.dataValues

                // const formatedDbData = data
                // const entries = Object.key(data).map(key => {

                //     return entries;
                // });

            }


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

            request("https://www.navysealfoundation.org/our-fallen-heroes/", (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    // const fallenHeroContainer = $(".fallen-hero-item")
                    // var fallenHeroInd = $(".fallen-container").find("div")
                    $(".fallen-hero-item").each(function (i, res) {
                        // console.log(res)

                        // var fallenSeal = {}


                        axios.get(($(this).find('.image-container').attr('data-src-img')), { responseType: "arrayBuffer" })
                            .then(axiResponce => {
                                const buf = Buffer.from(axiResponce.data, "utf-8")
                                var format = formatSiteData($(this), buf)
                                result.push(format)
                                // console.log(buf)

                            }
                            )
                            .catch(axiResponce => console.error(axiResponce))






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

router.get('/links', (req, res) => {
    res.render('links');
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

router.get('/contact', (req, res) => {
    res.render('contact');
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

    router.post("/send", (req, res) => {
        const output = `
        <p>You have a new message.</p>
        <h3>Message Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email Address: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `;
        let transporter = nodemailer.createTransport({
        // create reusable transporter object using the default SMTP transport
          service: 'gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
        });
      
        // send mail with defined transport object
        let mailOptions = {
          from: 'rememberthembf@gmail.com', // sender address
          to: ["alvinclemens@gmail.com", "evanmackay71@yahoo.com", "tjessee7624@gmail.com", "layne.d.hansen@gmail.com"],// list of receivers
          subject: "Hello ✔", // Subject line
          text: "New message", // plain text body
          html: output, // html body
        };
      
        
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        transporter.sendMail(mailOptions, (error) => {
            if (error) console.log(error);
            console.log("Message sent")
            
            res.render("contact", {msg: 'Email has been sent!'})
        })
        
            // Generate test SMTP service account from ethereal.email
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