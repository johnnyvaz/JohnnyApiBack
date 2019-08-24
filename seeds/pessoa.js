
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('pessoas').del()
    .then(function () {
        // Inserts seed entries
        return knex('pessoas').insert([
            {id: 1, nome: 'Pessoa Padrão', endereco:'rua do sol', 
            numero: '987', bairro: 'centro', email: 'teste@teste.com',
            facebook: '@testeface', dataNasc:'2019-01-01'
        }
        ]);
    });
};
