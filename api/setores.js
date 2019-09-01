module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const setores = {...req.body }

        if (req.params.id) setores.id = req.params.id

        try {
            existsOrError(setores.setor, 'Nome do setor não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (setores.id) {
            app.db('setores')
                .update(setores)
                .where({ id: setores.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('setores')
                .insert(setores)
                .then(_ => res.status(201).send({ "status":true, setores}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('setores').count('id').first()
        const count = result

        app.db('setores')
            //.select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(setores => res.json({ data:  setores, count, limit, page }))
            .catch(err => res.status(500).send(err))
    }

    return { get, save }
}