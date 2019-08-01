
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('categories', table => {
        table.integer('parentId').unsigned().references('id')
        .inTable('categories')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('categories', table => {
        table.dropColumn('parentId')
    })
};
