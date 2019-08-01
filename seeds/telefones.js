
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('telefones').del()
    .then(function () {
      // Inserts seed entries
      return knex('telefones').insert([
        {id: 1, telefone: '123456789'},
        {id: 2, telefone: '1637053861'}
      ]);
    });
};
