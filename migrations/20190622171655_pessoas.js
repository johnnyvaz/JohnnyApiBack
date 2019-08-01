
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pessoas', table => {
        table.increments('id').primary()
        table.string('nome',100)
        table.string('endereco',60)
        table.string('numero',10)
        table.string('bairro',60)
        table.string('email',100)
        table.string('facebook',100)
        table.date('dataNasc')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pessoas')
};
