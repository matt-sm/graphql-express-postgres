import config from '../knexfile'
import knex from 'knex'
import { Model } from 'objection'

const db = knex(config[process.env.NODE_ENV || 'development'])

Model.knex(db)

export class User extends Model {
  static get tableName() {
    return 'user'
  }
  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'user.id',
          to: 'post.author_id'
        }
      }
    }
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
