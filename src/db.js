import knex from 'knex';

const db = knex({
   client: 'postgresql',
    connection: {
      database: 'blog'
    }
 });

db.migrate.latest(); 

export const getAllUsers = () => (
    db.select().table('users')
);