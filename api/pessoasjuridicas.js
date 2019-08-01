module.exports = app => {
    const { existsOrError, isNumber } = app.api.validation
    
    const save = (req, res) => {
        const pessoasjuridica = { ...req.body }
        if(req.params.id) pessoasjuridica.id = req.params.id

        try {
            existsOrError(pessoasjuridica.nome, 'Nome não informado')
            existsOrError(pessoasjuridica.endereco, 'Endereço não informado')
            existsOrError(pessoasjuridica.bairro, 'Bairro não informado')
            existsOrError(pessoasjuridica.cidade, 'Cidade não informada')
            isNumber(pessoasjuridica.telefone, 'Campo telefone só aceita números')
            existsOrError(pessoasjuridica.telefone, 'E-mail não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(pessoasjuridica.id) {
            app.db('pessoasjuridicas')
                .update(pessoasjuridica)
                .where({ id: pessoasjuridica.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pessoasjuridicas')
                .insert(pessoasjuridica)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('pessoasjuridicas')
            .then(pessoasjuridica => res.json(pessoasjuridica))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('pessoasjuridicas')
            .where({ id: req.params.id })
            .first()
            .then(pessoasjuridica => res.json(pessoasjuridica))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res) => {
        try {
            const rowsDeleted = await app.db('pessoasjuridicas')
            .where({ id: req.params.id }).del()
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove }
}