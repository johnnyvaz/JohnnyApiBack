module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const categoria = { ...req.body }
        if(req.params.id) categoria.id = req.params.id
        try {
            existsOrError(categoria.descricao, 'Descrição não informado')
            existsOrError(categoria.depreciacaoTxAnual, 'Taxa de depreciação não informado')
            existsOrError(categoria.vidaUtil, 'Cidade não informada')
            
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(categoria.id) {
            app.db('categorias')
                .update(categoria)
                .where({ id: categoria.id })
                .then(_ => res.status(201).send({ "status":true, categoria}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categorias')
                .insert(categoria)
                .then(_ => res.status(201).send({ "status":true, categoria}))
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('categorias')
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categorias')
            .where({ id: req.params.id })
            .first()
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('categorias')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}