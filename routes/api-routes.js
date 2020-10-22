var db = require("../models");

var express = require("express")

var app = express()


module.exports = function(app) {
    app.get("/api/servicemembers", function(req, res) {
        db.ServiceMember.findAll({}).then(function(dbServiceMember) {
            res.json(dbServiceMember)
        });
    });

    app.post("/api/servicemembers", function(req, res) {
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

    app.delete("/api/servicemembers/:id", function(req, res) {
        db.ServiceMember.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function(dbServiceMember) {
                res.json(dbServiceMember)
            });
    });

    app.put("/api/servicemembers", function(req, res) {
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

};