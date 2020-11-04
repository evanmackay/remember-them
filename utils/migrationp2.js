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
            age: 0,
            branch_of_service: "Navy",
            unit: current[2],
            date_of_death: current[4] || " ",
            awards: "NaN",
            summary_of_service: "NaN",
            approved: true,
        }
        await db.ServiceMember.create(data)
    }
    // db.ServiceMember.create({
    //     image: "https://www.navysealfoundation.org/wp-content/uploads/2011/08/John-Douangdara.jpg",
    //     first_name: "name",
    //     last_name: "smith",
    //     age: 33,
    //     branch_of_service: "navy",
    //     unit: "seals",
    //     date_of_death: "12/12/2012",
    //     awards: "wefuihwef",
    //     summary_of_service: "iuhefwuihwef",
    //     approved: true
    // })
        // .then(function (dbServiceMember) {
        //     console.log(dbServiceMember)


        // })
        // .catch((err) => {
        //     console.log(err);
        // });

});
