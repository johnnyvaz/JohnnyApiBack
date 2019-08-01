module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const pessoa = {...req.body }

        if (req.params.id) pessoa.id = req.params.id

        try {
            existsOrError(pessoa.codpessoa, 'Código da pessoa não informado')
            existsOrError(pessoa.nomecliente, 'Nome não informado')
            existsOrError(pessoa.nomefantasia, 'Nome Fantasia não informado')
            existsOrError(pessoa.cnpj, 'CNPJ não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (pessoa.id) {
            app.db('pessoas')
                .update(pessoa)
                .where({ id: pessoa.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pessoas')
                .insert(pessoa)
                .then(_ => res.status(201).send({ "status":true, pessoa}))
                .catch(err => res.status(500).send(err))
        }
    }
    const limit = 10
    const get = async(req, res) => {
        const page = req.query.page || 1

        const result = await app.db('pessoas').count('id').first()
        const count = parseInt(result.count)

        app.db('pessoas')
            .select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(pessoas => res.json({ data: pessoas, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('pessoas')
            .where({ id: req.params.id })
            .first()
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('pessoas')
            .where({ id: req.params.id }).del()
            res.status(201).send({ "status":true, pessoa})
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}