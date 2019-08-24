
exports.up = function(knex, Promise) {
    return knex.schema.createTable('setores', table => {
        table.increments('id').primary()
        table.string('cor',80)
        table.string('nome',80)
        table.integer('cod')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('setores')
};
