
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('certificados', table => {
        table.integer('idPessoa').unsigned().references('id')
        .inTable('pessoas').notNull()
        table.integer('idCurso').unsigned().references('id')
        .inTable('cursos').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.raw("SET sql_mode='TRADITIONAL'")
    .table('certificados', function (table) {
        table.dropColumn('idPessoa')
        table.dropColumn('idCurso')
    })
};
