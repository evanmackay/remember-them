var db = require("../models");
var express = require("express");
var router = express.Router();


// module.exports = function(app) {
    router.get("/", function(req, res) {
        db.ServiceMember.findAll({}).then(function(dbServiceMember) {
            res.json(dbServiceMember)
        });
    });

    router.post("/", function(req, res) {
        db.ServiceMember.create({
            name: req.body.name,
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

    router.put("/", function(req, res) {
        db.ServiceMember.update({
            name: req.body.name,
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

// };

module.exports = router