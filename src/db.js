import config from '../knexfile'
import knex from 'knex'
import { Model } from 'objection'

const db = knex(config)

Model.knex(db)

export class User extends Model {
  static get tableName() {
    return 'user'
  }
}
