

module.exports = function(sequelize, DataTypes) {
    
    var ServiceMember = sequelize.define("ServiceMember", {
        image: {type: DataTypes.STRING},
        first_name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
        last_name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
        age: { type: DataTypes.INTEGER, allowNull: false, validate: {len: [1, 20] } },
        branch_of_service: { type: DataTypes.STRING, allowNull: false, validate: {len: [1,20] } },
        date_of_birth: { type: DataTypes.STRING },
        unit: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 100] } },
        date_of_death: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 100] } },
        awards: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 500] } },
        summary_of_service: {type: DataTypes.TEXT, allowNull: false, validate: {len: [1, 1000] } },
        approved: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    });
    return ServiceMember;
}


