// Update with your config settings.

module.exports = {

  development: {
    client: 'mssql',
    connection: {
      "server": "192.168.1.224\\DUMMY",
      "user": "sa",
      "password": "SerbaAgung2012",
      "database": "ARTHAFORRETAIL2012"
    }
  },

  
  production: {
    client: 'mssql',
    connection: {
      "server": "192.168.1.223",
      "user": "sa",
      "password": "SerbaAgung2012",
      "database": "ARTHAFORRETAIL2012"
    }
  }

};
