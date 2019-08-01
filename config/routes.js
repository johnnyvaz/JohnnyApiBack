const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        //.all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)

    app.route('/categorias/')  //funcionando - ok
        .all(app.config.passport.authenticate())
        .get(app.api.categorias.get)
        .put(admin(app.api.categorias.save))
        .delete(admin(app.api.categorias.remove))

    app.route('/categorias/:id') //funcionando - ok
        .all(app.config.passport.authenticate())
        .get(app.api.categorias.getById)
        .put(admin(app.api.categorias.save))
        .delete(admin(app.api.categorias.remove))
        
    app.route('/municipios/')  //
        .all(app.config.passport.authenticate())
        .get(app.api.municipios.get)
        .put(admin(app.api.municipios.save))
        .delete(admin(app.api.municipios.remove))

    app.route('/municipios/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.municipios.getById)
        .put(admin(app.api.municipios.save))
        .delete(admin(app.api.municipios.remove))

    app.route('/telefones/')  //
        .all(app.config.passport.authenticate())
        .get(app.api.telefones.get)
        .put(admin(app.api.telefones.save))
        .delete(admin(app.api.telefones.remove))

    app.route('/telefones/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.telefones.getById)
        .put(admin(app.api.telefones.save))
        .delete(admin(app.api.telefones.remove)) 
        
    app.route('/pessoas/')  //
        .all(app.config.passport.authenticate())
        .get(app.api.pessoas.get)
        .put(admin(app.api.pessoas.save))
        .delete(admin(app.api.pessoas.remove))

    app.route('/pessoas/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.pessoas.getById)
        .put(admin(app.api.pessoas.save))
        .delete(admin(app.api.pessoas.remove))
        
    app.route('/ibpt/versao/')  //
        //.all(app.config.passport.authenticate())
        .get(app.api.ibpt.getVersao)
    
    app.route('/ibpt/uf/:id')
        .get(app.api.ibpt.getByUf)
}