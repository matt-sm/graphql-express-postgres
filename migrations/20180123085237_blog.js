
exports.up = async (knex, Promise) => {
return await Promise.all([

        knex.schema.createTable('user', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('password');
            table.string('name');
            table.string('email');
            table.timestamps();
        }),

        knex.schema.createTable('post', function(table){
            table.increments('id').primary();
            table.string('title');
            table.string('body');
            table.integer('author_id')
                 .references('id')
                 .inTable('user');
            table.dateTime('postDate');
        }),

        knex.schema.createTable('comment', function(table){
            table.increments('id').primary();
            table.string('body');
            table.integer('author_id')
                 .references('id')
                 .inTable('user');
            table.integer('post_id')
                 .references('id')
                 .inTable('post');
            table.dateTime('postDate');
        })
    ])  
};

exports.down = async (knex, Promise) => {
    return await Promise.all([
            knex.schema.dropTable('user'),
            knex.schema.dropTable('post'),
            knex.schema.dropTable('comment')
        ])  
};
