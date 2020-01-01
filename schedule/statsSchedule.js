const schedule = require('node-schedule')

module.exports = app => {
    console.log('testando...')
    schedule.scheduleJob('0,1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const categoriasCount = await app.db('categorias').count('id').first()
        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        const stat = new Stat({
            users: usersCount.count,
            categorias: categoriasCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategorias = !lastStat || stat.categorias !== lastStat.categorias
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategorias || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
        
    })
}