module.exports = function(sequelize, DataTypes) {
    var ForumPost = sequelize.define("ForumPost", {
        post: { type: DataTypes.TEXT, allowNull: false, validate: {len: [1, 1000] } },
        poster_name: { type: DataTypes.STRING, allowNull: false, validate: {len: [1, 50] } },
    });
    return ForumPost;
}