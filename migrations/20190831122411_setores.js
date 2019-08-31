
exports.up = function(knex, Promise) {
    return knex.schema.createTable('setores', table => {
        table.increments('id').primary()
        table.string('nomeSetor',100).notNull()
        table.string('responsavel',50)
        table.string('status',3)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('setores')
};