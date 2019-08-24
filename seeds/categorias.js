
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categorias').del()
    .then(function () {
      // Inserts seed entries
      return knex('categorias').insert([
        {id: 1, descricao: 'Edifícios', depreciacaoTxAnual:'4', vidaUtil:'25'},
        {id: 2, descricao: 'Máquinas e Edifícios', depreciacaoTxAnual:'10', vidaUtil:'10'},
        {id: 3, descricao: 'Instalações', depreciacaoTxAnual:'10', vidaUtil:'10'},
        {id: 4, descricao: 'Móveis e Utensílios', depreciacaoTxAnual:'10', vidaUtil:'10'},
        {id: 5, descricao: 'Veículos', depreciacaoTxAnual:'20', vidaUtil:'5'},
        {id: 6, descricao: 'Computadores e Periféricos', depreciacaoTxAnual:'20', vidaUtil:'5'}
      ]);
    });
};
