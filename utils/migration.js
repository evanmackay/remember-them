const db = require("../models")
const fs = require("fs")


db.sequelize.sync().then(function () {
var sealStingData = fs.readFileSync(__dirname + "\\seals_db.csv").toString().split("\n")

// console.log(sealStingData)

for (i = 1; i < sealStingData.length; i++) {
 let curent = sealStingData[i].split(",")
//  let  = sealStingData[i].split(" ")
 console.log(curent)
}
  
    db.ServiceMember.create({
        
        first_name: curent,
        last_name:"smith",
        age:33,
        branch_of_service:"fjiewojiofew",
        unit:"fiwoejoihwejfiohu",
        date_of_death:new Date (),
        awards:"wefuihwef",
        summary_of_service:"iuhefwuihwef",
        approved:true
    })
    
});
