module.exports = function(sequelize, DataTypes) {
    var ServiceMember = sequelize.define("ServiceMember", {
        first_name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
        last_name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
        age: { type: DataTypes.INTEGER, allowNull: false, validate: {len: [1, 20] } },
        date_of_birth: { type: DataTypes.DATE },
        unit: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 100] } },
        date_of_death: { type: DataTypes.DATE, allowNull: false, validate: {len: [1, 100] } },
        awards: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 500] } },
        summary_of_service: {type: DataTypes.TEXT, allowNull: false, validate: {len: [1, 1000] } }
    });
    return ServiceMember;
}


