const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
      filename: "./database.sqlite"
    },
    useNullAsDefault: true
});
let keys = [
    '1010114', 'fsfsd8sud8suhHhh77n', '9ji8JMbsjbniBNHba', 'ijsdj8JimasKNknakmimk'
]

const User = require('./Users.js');

module.exports = User;