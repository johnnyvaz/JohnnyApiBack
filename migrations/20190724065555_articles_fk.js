
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('articles', table => {
        table.integer('userId').unsigned().references('id')
            .inTable('users').notNull()
        table.integer('categoryId').unsigned().references('id')
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.raw("SET sql_mode='TRADITIONAL'")
  .table('articles', function (table) {
    table.dropColumn('userId')
    table.dropColumn('categoryId')
  })
};
