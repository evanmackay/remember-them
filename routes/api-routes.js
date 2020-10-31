const db = require("../models");
const express = require("express");
const router = express.Router();
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
    db.ServiceMember.findAll({
        where: {
            approved: true
        }
    })
    .then((dbServiceMember) => {
        let obj = {
            servicemembers: dbServiceMember
        }
        res.render('SEALs', obj);
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
router.post("/SEALs", function(req, res) {
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
    .then(function(dbServiceMember) {
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
router.delete("/SEALs/:id", function(req, res) {
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