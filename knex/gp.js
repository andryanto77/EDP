const environment = 'production'
const config = require('../config/knexgp')[environment];
module.exports = require('knex')(config);

