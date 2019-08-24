
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cursos', table => {
        table.increments('id').primary()
        table.string('nomeCurso',60).notNull()
        table.string('livro')
        table.integer('nivel')
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cursos')
};