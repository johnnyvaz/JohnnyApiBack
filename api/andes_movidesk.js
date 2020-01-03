module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const andes_movidesk = { ...req.body }

            app.db('andes_movidesk_cdrs')
                .insert(andes_movidesk)
                .then(_ => res.status(201).send({ "status":true, andes_movidesk}))
                .catch(err => res.status(500).send(err))
    }

    const limit = 10
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('andes_movidesk_cdrs').count('codid').first()
        const count = parseInt(result.count)
        
        app.db('andes_movidesk_cdrs')
            // .select('id', 'cod_mun', 'nome_mun')
            .limit(limit).offset(page * limit - limit)
            .then(andes_movidesk_cdrs => res.json({ data: andes_movidesk_cdrs, count, limit }))
            .catch(err => res.status(500).send(err))
    }



    return { save, get }
}