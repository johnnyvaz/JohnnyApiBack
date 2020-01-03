exports.up = function(knex, Promise) {
    return knex.schema.createTable('andes_movidesk_cdrs', table => {
        table.increments('codid').primary()
        table.integer('queueId',10)
        table.string('clientNumber',128)
        table.string('id',256)
        table.string('branchLine',128)
        table.timestamp('callDate')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('andes_movidesk_cdrs')
};