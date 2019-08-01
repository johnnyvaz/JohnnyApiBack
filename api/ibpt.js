module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation

    const getVersao = (req, res) => {
        app.db('ibpt_versao')
            .then(ibpt_versao => res.json(ibpt_versao))
            .catch(err => res.status(500).send(err))
    }

    // const limit = 10
    const getByUf = async (req, res) => {
        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const result = await app.db('ibpt_aliquota').count('idtabela')
        .where({ codestado: req.params.id })
        const count = result
        

        app.db('ibpt_aliquota')
            //.select('codigo','tipo','nacionalfederal','importadosfederal')
            .where({ codestado: req.params.id })
            .limit(limit).offset(page * limit - limit)
            .then(ibpt_aliquota => res.json({ data:  {count, limit, page}, ibpt_aliquota}))
            .catch(err => res.status(500).send(err))
    }


    return { getVersao, getByUf }
}