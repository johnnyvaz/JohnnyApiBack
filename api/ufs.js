module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const uf = { ...req.body }
        if(req.params.id) uf.id = req.params.id

        try {
            isNumber(uf.uf, 'Campo uf só aceita números')
            existsOrError(uf.uf, 'E-mail não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(uf.id) {
            app.db('ufs')
                .update(uf)
                .where({ id: uf.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('ufs')
                .insert(uf)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('ufs')
            .then(uf => res.json(uf))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('ufs')
            .where({ id: req.params.id })
            .first()
            .then(uf => res.json(uf))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('ufs')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}