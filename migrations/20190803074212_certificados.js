
exports.up = function(knex, Promise) {
    return knex.schema.createTable('certificados', table => {
        table.increments('id').primary()
        table.boolean('cursoConcluido').default(0)
        table.boolean('entregue').default(0)
        table.date('dataConclusao')
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('certificados')
};