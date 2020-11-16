const knex = require('../db/knex')

module.exports = async () =>{
  try {
    const response = await knex.schema.hasTable('users')

    if(!response){
      await knex.schema.createTable('users', (table) => {
          table.increments('id').primary()
          table.string('username', 100).unique()
          table.string('password', 100)
          table.float('balance', 100)
          table.string('designation', 10)
          table.timestamps(true, true)
        })
        }
  } catch (error) {
    console.log(error)
  }

}



