module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const setors = {...req.body }

        if (req.params.id) setors.id = req.params.id

        try {
            existsOrError(setors.setor, 'Nome do setor não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (setors.id) {
            app.db('setors')
                .update(setors)
                .where({ id: setors.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('setors')
                .insert(setors)
                .then(_ => res.status(201).send({ "status":true, setors}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('setors').count('id').first()
        const count = result

        app.db('setors')
            //.select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(setors => res.json({ data:  setors, count, limit, page }))
            .catch(err => res.status(500).send(err))
    }

    return { get, save }
}