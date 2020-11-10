module.exports = {
    async seed(knex){
        await knex('users').insert([
            {
                login: 'fulano',
                password: 'fulano',
            },
            {
                login: 'joaozinho',
                password: 'joaozinho',
            }
        ])
    }
}