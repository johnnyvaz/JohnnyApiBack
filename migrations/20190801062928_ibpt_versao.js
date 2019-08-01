
exports.up = function(knex, Promise) {
    return knex.schema.createTable('ibpt_versao', table => {
        table.integer('idtabela').notNull()
        table.string('codestado',2).notNull()
        table.string('versao',60).notNull()
        table.date('vigenciainicio')
        table.date('vigenciafim')
        table.string('chave',60)
        table.string('fonte',200)
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ibpt_versao')
};