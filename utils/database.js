const sequilize = require('sequelize')
const Sequilize = new sequilize (
    'seals_db',
    'seals_db_root@localhost',
    'seals_db_Toskiornottoski500!',
    {
        dialect:'mysql',
        host: 'localhost'
    }
);
module.exports = sequilize