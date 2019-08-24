const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.get('/', function (req, res) {
        res.send('Backend da Api Achei');
    });
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/setores/')  //funcionando - ok
        .all(app.config.passport.authenticate())
        .get(app.api.setores.get)
        .put(admin(app.api.setores.save))
        .delete(admin(app.api.setores.remove))

    app.route('/setores/:id') //funcionando - ok
        .all(app.config.passport.authenticate())
        .get(app.api.setores.getById)
        .put(admin(app.api.setores.save))
        .delete(admin(app.api.setores.remove))
        
}