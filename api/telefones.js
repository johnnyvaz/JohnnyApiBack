module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const telefone = { ...req.body }
        if(req.params.id) telefone.id = req.params.id

        try {
            isNumber(telefone.telefone, 'Campo telefone só aceita números')
            existsOrError(telefone.telefone, 'E-mail não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(telefone.id) {
            app.db('telefones')
                .update(telefone)
                .where({ id: telefone.id })
                .then(_ => res.status(201).send({ "status":true, telefone}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('telefones')
                .insert(telefone)
                .then(_ => res.status(201).send({ "status":true, telefone}))
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('telefones')
            .then(telefone => res.json(telefone))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('telefones')
            .where({ id: req.params.id })
            .first()
            .then(telefone => res.json(telefone))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('telefones')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}