module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const cursos = {...req.body }

        if (req.params.id) cursos.id = req.params.id

        try {
            existsOrError(cursos.nomeCurso, 'Nome do curso não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (cursos.id) {
            app.db('cursos')
                .update(cursos)
                .where({ id: cursos.id })
                .then(_ => res.status(201).send( {"status":"Alterado", cursos}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cursos')
                .insert(cursos)
                .then(_ => res.status(201).send({ "status":"Alterado", cursos}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const get = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('cursos').count('id').first()
        const count = result

        app.db('cursos')
            .select('id', 'nomeCurso', 'livro', 'nivel')
            .limit(limit).offset(page * limit - limit)
            .then(cursos => res.json({ data: {count, limit, page} , cursos }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cursos')
            .where({ id: req.params.id })
            .first()
            .then(pessoa => res.json(pessoa))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('cursos')
            .where({ id: req.params.id }).del()
            res.status(201).send({ "status":true, pessoa})
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}