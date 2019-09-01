module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const setores = {...req.body }

        if (req.params.id) setores.id = req.params.id

        try {
            existsOrError(setores.nomeSetor, 'Nome do setor não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (setores.id) {
            app.db('setores')
                .update(setores)
                .where({ id: setores.id })
                .then(_ => res.status(204).send({ "status":true, setores}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('setores')
                .insert(setores)
                .then(_ => res.status(201).send({ "status":true, setores}))
                .catch(err => res.status(500).send(err))
                console.log(setores)
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('setores').count('id').first()
        const count = parseInt(result.count)

        app.db('setores')
            //.select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(setores => res.json({ data:  setores, count, limit, page }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('setores')
            .where({ id: req.params.id })
            .first()
            .then(setor => res.json(setor))
            .catch(err => res.status(500).send(err))
    }


    return { get, save, getById }
}