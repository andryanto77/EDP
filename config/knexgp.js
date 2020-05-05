// Update with your config settings.

module.exports = {

  development: {
    client: 'mssql',
    connection: {
      "server": "192.168.1.224\\DUMMY",
      "user": "sa",
      "password": "SerbaAgung2012",
      "database": "SAB"
    }
  },

  
  production: {
    client: 'mssql',
    connection: {
      "server": "192.168.1.222",
      "user": "sa",
      "password": "S3rbaAgung2017",
      "database": "SAB"
    }
  }

};
