module.exports = function(sequelize, DataTypes) {
    var Soldier = sequelize.define("Soldier", {
        name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
        age: { type: DataTypes.INTEGER, allowNull: false, validate: {len: [1, 20]} },
        date_of_birth: { type: DataTypes.}
    })
}