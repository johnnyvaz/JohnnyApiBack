
exports.up = function(knex, Promise) {
    return knex.schema.createTable('telefones', table => {
        table.increments('id').primary()
        table.string('telefone',12)
        table.string('observacao',40)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('telefones')
};
