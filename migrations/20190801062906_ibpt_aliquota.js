
exports.up = function(knex, Promise) {
    return knex.schema.createTable('ibpt_aliquota', table => {
        table.integer('idtabela').notNull()
        table.string('codestado',2).notNull()
        table.string('codigo',8).notNull()
        table.integer('excecao',2 )
        table.string('tipo',20)
        table.float('nacionalfederal',18,2)
        table.float('importadosfederal',18,2)
        table.float('estadual',18,2)
        table.float('municipal',18,2)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ibpt_aliquota')
};