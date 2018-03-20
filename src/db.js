import config from '../knexfile'
import knex from 'knex'
import { Model } from 'objection'

export const db = knex(config[process.env.NODE_ENV || 'development'])

Model.knex(db)

export class User extends Model {
  static get tableName() {
    return 'user'
  }
}

export class Post extends Model {
  static get tableName() {
    return 'post'
  }
}

export class Comment extends Model {
  static get tableName() {
    return 'comment'
  }
}
