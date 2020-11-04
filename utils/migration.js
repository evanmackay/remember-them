const db = require("../models")
const fs = require("fs")


db.sequelize.sync().then(async function () {
    var sealStingData = fs.readFileSync(__dirname + "\\seals_db.csv").toString().split("\n")

    // console.log(sealStingData)

    for (let i = 1; i < sealStingData.length; i++) {
        // the data is in their corrisponding rows
        let current = sealStingData[i].split(",")

        //  let  = sealStingData[i].split(" ")
        // let img = sealStingData[i].split("https://")
        console.log(current)
        let data = {


            image: current[5],
            first_name: current[1],
            last_name: " ",
            age: 2378255,
            branch_of_service: "Navy",
            unit: current[2],
            date_of_death: current[4] || " ",
            awards: "None listed",
            summary_of_service: "Not avalable",
            approved: true,
        }
        await db.ServiceMember.create(data)
    }
   
});
