
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categorias', table => {
        table.increments('id').primary()
        table.string('descricao',80)
        table.double('depreciacaoTxAnual')
        table.integer('vidaUtil')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categorias')
};
