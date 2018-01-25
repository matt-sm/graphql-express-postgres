import knex from 'knex'
import { Model } from 'objection'

const db = knex({
  client: 'postgresql',
  connection: {
    database: 'blog'
  }
})

db.migrate.latest()

Model.knex(db)

export class User extends Model {
  static get tableName() {
    return 'user';
  }
}
