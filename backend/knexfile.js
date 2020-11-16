module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      database: 'bank',
      user: 'root',
      password: ''
    },
    migrations:{
      directory: __dirname + '/src/db/migrations'
    },
    seeds:{
      directory: __dirname + '/src/db/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'bank',
      user:     'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'bank',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
