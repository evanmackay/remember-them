var db = require("../models");
var express = require("express");
var router = express.Router();


// pull info from the database and display
    router.get("/", function(req, res) {
        db.ServiceMember.findAll({}).then(function(dbServiceMember) {
            res.json(dbServiceMember)
        });
    });
// posting new info added by user to database
    router.post("/", function(req, res) {
        db.ServiceMember.create({
            image: req.body.image,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            date_of_birth: req.body.date_of_birth,
            unit: req.body.unit,
            date_of_death: req.body.date_of_death,
            awards: req.body.awards,
            summary_of_service: req.body.summary_of_service

        }).then(function(dbServiceMember) {
            res.json(dbServiceMember)
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
            first_name: req.body.name,
            last_name: req.body.name,
            age: req.body.age,
            date_of_birth: req.body.date_of_birth,
            unit: req.body.unit,
            date_of_death: req.body.date_of_death,
            awards: req.body.awards,
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