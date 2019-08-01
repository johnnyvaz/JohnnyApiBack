module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const municipio = { ...req.body }
        if(req.params.id) municipio.id = req.params.id

        try {
            isNumber(municipio.municipio, 'Campo municipio só aceita números')
            existsOrError(municipio.municipio, 'Campo Município não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(municipio.id) {
            app.db('municipios')
                .update(municipio)
                .where({ id: municipio.id })
                .then(_ => res.status(201).send({ "status":true, municipio}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('municipios')
                .insert(municipio)
                .then(_ => res.status(201).send({ "status":true, municipio}))
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('municipios').count('id').first()
        const count = parseInt(result.count)
        
        app.db('municipios')
            .select('id', 'cod_mun', 'nome_mun')
            .limit(limit).offset(page * limit - limit)
            .then(municipios => res.json({ data: municipios, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('municipios')
            .where({ id: req.params.id })
            .first()
            .then(municipio => res.json(municipio))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('municipios')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}