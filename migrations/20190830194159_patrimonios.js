
exports.up = function(knex, Promise) {
    return knex.schema.createTable('patrimonios', table => {
        table.increments('id').primary()
        table.string('codPat').notNull()
        table.string('patrimonio',150).notNull()
        table.string('tipo',20)
        table.string('marca',50)
        table.string('material',150)
        table.string('destino',30)
        table.string('localizacao',100)
        table.float('valor',10,2)
        table.text('observacao')
        table.date('dataCompra')
        table.string('notafiscal',60)
        table.string('status',3)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('patrimonios')
};