export const up = async knex =>
  knex.schema.table('user', table => {
    table.dropColumn('username')
  })

export const down = async knex =>
  knex.schema.table('user', table => {
    table.string('username')
  })
