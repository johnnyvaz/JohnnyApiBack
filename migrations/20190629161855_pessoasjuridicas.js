
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pessoasjuridicas', table => {
        table.increments('id').primary()
        table.string('nome',100)
        table.string('fantasia',60)
        table.string('cnpj',14)
        table.string('uf',2)
        table.string('ie',14)
        table.string('cep',8)
        table.string('endereco',60)
        table.string('num',10)
        table.string('compl',60)
        table.integer('bairro',60)
        table.string('email',60)
        table.integer('cod_mun',7).unsigned()
        table.foreign('cod_mun').references('municipios.id')
        table.integer('idTelefone').unsigned()
        table.foreign('idTelefone').references('telefones.id')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pessoasjuridicas')
};
