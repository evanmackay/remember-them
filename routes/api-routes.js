const db = require("../models");
const express = require("express");
const router = express.Router();


//GET requests to display various handlebars files
router.get("/", function(req, res) {
    res.render("index");
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