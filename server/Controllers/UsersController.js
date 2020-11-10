const { json } = require('express')
const knex = require('../database/connection')

class UsersController{
    async login(request, response){
        try{
            const {login, password} = request.body
            console.log(JSON.stringify(request.body))
            const user_data = await knex('users')
                .select('id', 'login', 'points_t', 'points_m', 'points_w')
                .where('login', String(login))
                .where('password', String(password))
            if(user_data.length>0){
                response.json(user_data)
            }else{
                response.status(400).json({message: 'Usuário ou Senha incorretos!'})
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = UsersController