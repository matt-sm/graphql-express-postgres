export const up = async knex =>
  await knex.schema.table('user', table => {
    table.dropColumn('username')
  })

export const down = async knex =>
  await knex.schema.table('user', table => {
    table.string('username')
  })
