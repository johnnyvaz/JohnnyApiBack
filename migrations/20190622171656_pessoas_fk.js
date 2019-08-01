
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('pessoas', table => {
        table.integer('cod_mun',7).unsigned()
        table.foreign('cod_mun').references('municipios.id')
        table.integer('idTelefone').unsigned()
        table.foreign('idTelefone').references('telefones.id')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('pessoas', table => {
        table.dropColumn('cod_mun')
        table.dropColumn('idTelefone')
    })
};
