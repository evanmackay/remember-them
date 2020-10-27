const db = require("../models");
const express = require("express");
const router = express.Router();


// pull info from the database and display
    router.get("/", function(req, res) {
        res.render("index");
    });

    router.get('/SEALs', (req, res) => {
        res.render('SEALs', ServiceMember);
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
// posting new info added by user to database
    router.post("/SEALs", function(req, res) {
        db.ServiceMember.create({
            image: req.body.image,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
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
            throw err;
        });
    });
// allows user to delete info if they choose
    router.delete("/:id", function(req, res) {
        db.ServiceMember.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function(dbServiceMember) {
                res.json(dbServiceMember)
            });
    });
// allows user to update info
    router.put("/", function(req, res) {
        db.ServiceMember.update({
            image: req.body.image,
            first_name: req.body.name,
            last_name: req.body.name,
            age: req.body.age,
            date_of_birth: req.body.date_of_birth,
            unit: req.body.unit,
            date_of_death: req.body.date_of_death,
            awards: req.body.awards,
            biography: req.body.biography,
            summary_of_service: req.body.summary_of_service
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(function(dbServiceMember) {
                res.json(dbServiceMember);
            });
    });



module.exports = router