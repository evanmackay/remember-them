const db = require("../models")
const fs = require("fs")
const express = require("express");
const router = express.Router();
db.sequelize.sync().then(function () {
var sealStingData = fs.readFileSync(__dirname + "\\seals_db.csv").toString().split("\n")

// console.log(sealStingData)

for (i = 1; i < sealStingData.length; i++) {
 let curent = sealStingData[i].split(",")
//  let  = sealStingData[i].split(" ")
let img = sealStingData[i].split("")
 console.log(curent)
}
router.post("/SEALs", function (req, res) {

    db.ServiceMember.create({
        
        first_name:req.body.curent,
        last_name:"johnson",
        age:33,
        branch_of_service:"fjiewojiofew",
        unit:"fiwoejoihwejfiohu",
        date_of_death:new Date (),
        awards:"wefuihwef",
        summary_of_service:"iuhefwuihwef",
        approved:true
    })
    
});
})