
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ibpt_versao').del()
    .then(function () {
      // Inserts seed entries
      return knex('ibpt_versao').insert([
        {idtabela: 201905, codestado: 'MG', versao: '19.1.B', vigenciainicio: '2019.05.01', vigenciafim: '2019.07.31', chave: 'D11D7F', fonte: 'IBPT/EMPRESOMETRO.COM.BR'},
        {idtabela: 201905, codestado: 'PR', versao: '19.1.B', vigenciainicio: '2019.05.01', vigenciafim: '2019.07.31', chave: 'D11D7F', fonte: 'IBPT/EMPRESOMETRO.COM.BR'},
        {idtabela: 201905, codestado: 'RJ', versao: '19.1.B', vigenciainicio: '2019.05.01', vigenciafim: '2019.07.31', chave: 'D11D7F', fonte: 'IBPT/EMPRESOMETRO.COM.BR'},
        {idtabela: 201905, codestado: 'SP', versao: '19.1.B', vigenciainicio: '2019.05.01', vigenciafim: '2019.07.31', chave: 'D11D7F', fonte: 'IBPT/EMPRESOMETRO.COM.BR'},

      ]);
    });
};
