const environment = 'development'
const config = require('../config/knexmysql')[environment];
module.exports = require('knex')(config);