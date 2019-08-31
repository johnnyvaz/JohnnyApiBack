module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const patrimonios = {...req.body }

        if (req.params.id) patrimonios.id = req.params.id

        try {
            existsOrError(patrimonios.patrimonio, 'Nome da patrimonio não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (patrimonios.id) {
            app.db('patrimonios')
                .update(patrimonios)
                .where({ id: patrimonios.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('patrimonios')
                .insert(patrimonios)
                .then(_ => res.status(201).send({ "status":true, patrimonios}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('patrimonios').count('id').first()
        const count = result

        app.db('patrimonios')
            //.select('id', 'nome', 'endereco', 'numero', 'bairro', 'email', 'facebook', 'dataNasc')
            .limit(limit).offset(page * limit - limit)
            .then(patrimonios => res.json({ data:  patrimonios, count, limit, page }))
            .catch(err => res.status(500).send(err))
    }

    return { get, save }
}