module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const certificados = {...req.body }

        if (req.params.id) certificados.id = req.params.id

        try {
            existsOrError(certificados.idPessoa, 'Pessoa não informada')
            existsOrError(certificados.idCurso, 'Curso não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        if (certificados.id) {
            app.db('certificados')
                .update(certificados)
                .where({ id: certificados.id })
                .then(_ => res.status(201).send( {"status":"Alterado", certificados}))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('certificados')
                .insert(certificados)
                .then(_ => res.status(201).send({ "status":"Alterado", certificados}))
                .catch(err => res.status(500).send(err))
        }
    }
    
    const getAll = async(req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('certificados').count('id').first()
        const count = result
const ce = "certificados"
const cu = "cursos"
const pe = "pessoas"
        app.db('certificados')
            .select( ce+'.id', ce+'.idPessoa', pe+'.nome', ce+'.idCurso', cu+'.nomeCurso', ce+'.cursoConcluido',ce+'.dataConclusao',
            ce+'.entregue')
            .from('certificados')
            .leftJoin('pessoas', 'certificados.idPessoa', 'pessoas.id')
            .leftJoin('cursos','certificados.idCurso', 'cursos.id')
            .limit(limit).offset(page * limit - limit)
            .then(certificados => res.json({ data: {count, limit, page} , certificados }))
            .catch(err => res.status(500).send(err))
    }

    const getByPessoa = async(req, res) => {
            const page = req.query.page || 1
            const limit = req.query.limit || 10
    
            const result = await app.db('certificados').count('id').first()
            const count = result
            const ce = "certificados"
            const cu = "cursos"
            const pe = "pessoas"
            
            app.db('certificados')
                .select( ce+'.id', ce+'.idPessoa', pe+'.nome', ce+'.idCurso', cu+'.nomeCurso', 
                ce+'.cursoConcluido',ce+'.dataConclusao', ce+'.entregue')
                .from('certificados')
                .leftJoin('pessoas', 'certificados.idPessoa', 'pessoas.id')
                .leftJoin('cursos','certificados.idCurso', 'cursos.id')
                .where({ idPessoa: req.params.id })
                .limit(limit).offset(page * limit - limit)
                .then(certificados => res.json({ data: {count, limit, page} , certificados }))
                .catch(err => res.status(500).send(err))
        }
    
    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('certificados')
            .where({ id: req.params.id }).del()
            res.status(201).send({ "status":true, pessoa})
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, getAll, getByPessoa , remove }
}