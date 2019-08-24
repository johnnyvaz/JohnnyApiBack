
exports.up = function(knex, Promise) {
    return knex.schema.createTable('ufs', table => {
        table.increments('id').primary()
        table.string('sigla',2)
        table.string('descricao',25)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ufs')
};
