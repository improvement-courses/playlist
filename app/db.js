var knex = require('knex');

var db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '9655',
        database: 'musics'
    }
});

module.exports = db;
