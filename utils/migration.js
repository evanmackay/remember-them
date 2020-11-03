const db = require("../models")
const fs = require("fs")


db.sequelize.sync().then(function () {
    var sealStingData = fs.readFileSync(__dirname + "\\seals_db.csv").toString().split("\n")

    // console.log(sealStingData)

    for (i = 1; i < sealStingData.length; i++) {
        // the data is in their corrisponding rows
        let current = sealStingData[i].split(",")

        //  let  = sealStingData[i].split(" ")
        // let img = sealStingData[i].split("https://")
        console.log(current)
    }
    router.post("/SEALs", function (req, res) {
        db.ServiceMember.create({

            first_name: req.res.name,
            last_name: "smith",
            age: 33,
            branch_of_service: "navy",
            unit: "",
            date_of_death: new Date(),
            awards: "wefuihwef",
            summary_of_service: "iuhefwuihwef",
            approved: true
        })
            .then(function (dbServiceMember) {
                res.json(dbServiceMember)

            })
            .catch((err) => {
                console.log(err);
            });
    });

});
