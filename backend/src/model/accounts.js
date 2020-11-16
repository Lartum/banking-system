const knex = require('../db/knex')

module.exports = async () =>{
try {
  const response = await knex.schema.hasTable('accounts')

  if(!response){
      await knex.schema.createTable('accounts', (table) => {
      table.increments('id').primary()
      table.integer('userid', 10)
      table.float('balance', 255)
      table.string('typeof_trans', 10)
      table.timestamps(true, true)
    })
    }
  } catch (error) {
    console.log(error)
  }

}



