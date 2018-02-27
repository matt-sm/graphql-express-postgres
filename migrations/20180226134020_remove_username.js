export const up = async (knex, Promise) => {
  return await knex.schema.table('user', table => {
    table.dropColumn('username')
  })
}

export const down = async (knex, Promise) => {
  return await knex.schema.table('user', table => {
    table.string('username')
  })
}
