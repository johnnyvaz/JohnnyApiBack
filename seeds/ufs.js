
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ufs').del()
    .then(function () {
      // Inserts seed entries
      return knex('ufs').insert([
        {id: 1, sigla: 'AC', descricao:'Acre'},
        {id: 2, sigla: 'AL', descricao:'Alagoas'},
        {id: 3, sigla: 'AM', descricao:'Amazonas'},
        {id: 4, sigla: 'AP', descricao:'Amapá'},
        {id: 5, sigla: 'BA', descricao:'Bahia'},
        {id: 6, sigla: 'DF', descricao:'Distrito Federal'},
        {id: 7, sigla: 'CE', descricao:'Ceará'},
        {id: 8, sigla: 'ES', descricao:'Espírito Santo'},
        {id: 9, sigla: 'GO', descricao:'Goiás'},
        {id: 10, sigla: 'MA', descricao:'Maranhão'},
        {id: 11, sigla: 'MT', descricao:'Mato Grosso'},
        {id: 12, sigla: 'MS', descricao:'Mato Grosso do Sul'},
        {id: 13, sigla: 'MG', descricao:'Minas Gerais'},
        {id: 14, sigla: 'PA', descricao:'Pará'},
        {id: 15, sigla: 'PB', descricao:'Paraíba'},
        {id: 16, sigla: 'PE', descricao:'Pernambuco'},
        {id: 17, sigla: 'PR', descricao:'Paraná'},
        {id: 18, sigla: 'PI', descricao:'Piauí'},
        {id: 19, sigla: 'RJ', descricao:'Rio de Janeiro'},
        {id: 20, sigla: 'RN', descricao:'Rio Grande do Norte'},
        {id: 21, sigla: 'RS', descricao:'Rio Grande do Sul'},
        {id: 22, sigla: 'RR', descricao:'Roraima'},
        {id: 23, sigla: 'RO', descricao:'Rondônia'},
        {id: 24, sigla: 'SC', descricao:'Santa Catarina'},
        {id: 25, sigla: 'SP', descricao:'São Paulo'},
        {id: 26, sigla: 'SE', descricao:'Sergipe'},
        {id: 27, sigla: 'TO', descricao:'Tocantins'},        
      ]);
    });
};
