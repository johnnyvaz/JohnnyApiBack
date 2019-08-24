
exports.up = function(knex, Promise) {
    return knex.schema.createTable('municipios', table => {
        table.increments('id').primary()
        table.integer('cod_mun',7)
        table.string('nome_mun',40)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('municipios')
};
