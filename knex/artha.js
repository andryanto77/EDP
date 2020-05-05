const environment = 'development'
const config = require('../config/knexartha')[environment];
module.exports = require('knex')(config);