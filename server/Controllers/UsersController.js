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
                response.json(user_data[0])
            }else{
                response.status(400).json({message: 'Usuário ou Senha incorretos!'})
            }
        }catch(error){
            console.log(error)
        }
    }
    async signup(request, response){
        const {login, password} = request.body
        console.log(JSON.stringify(request.body))
        const user_data = await knex('users').select('*').where('login', String(login))
        if(user_data.length>0){
            response.status(400).json({message: 'O nome de usuário já existe!'})
        }else{
            await knex('users').insert({
                login,
                password
            })
            response.json({
                message: 'Usuario criado com sucesso!'
            })
        }
        
        
    }
}

module.exports = UsersController