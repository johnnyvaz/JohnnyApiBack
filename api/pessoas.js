module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const pessoas = {...req.body }

        if (req.params.id) pessoas.id = req.params.id

        try {
            existsOrError(pessoas.nome, 'Nome da pessoa não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (pessoas.id) {
            app.db('pessoas')
                .update(pessoas)
                .where({ id: pessoas.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pessoas')
                .insert(pessoas)
                .then(_ => res.status(201).send({ "status":true, pessoas}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('pessoas').count('id').first()
        const count = result

        app.db('pessoas')
            .select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(pessoas => res.json({ data:  pessoas, count, limit, page }))
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