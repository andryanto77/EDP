// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      "server": "192.168.1.224\\DUMMY",
      "user": "sa",
      "password": "SerbaAgung2012",
      "database": "SAB"
    }
  },

  
  production: {
    client: 'mysql',
    connection: {
      "server": "127.0.0.1",
      "user": "root",
      "password": "",
      "database": "test"
    }
  }

};
