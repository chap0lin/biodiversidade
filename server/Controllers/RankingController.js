const knex = require('../database/connection')

class RankingController{
    async getQuiz(request, response){
        const raw_questions = await knex('questions').select('*').orderByRaw('RANDOM()').limit(7)
        const formated_questions = []
        await raw_questions.map(item => {
            formated_questions.push({
                id: item.id,
                question: item.question,
                answers: [item.option_1, item.option_2, item.option_3, item.option_4],
                correctAnswer: item.answer
            })
            return 0
        })
        response.json(formated_questions)
    }
    async getQuizQuestions(){
        const raw_questions = await knex('questions').select('*').orderByRaw('RANDOM()').limit(7)
        const formated_questions = []
        await raw_questions.map(item => {
            formated_questions.push({
                id: item.id,
                question: item.question,
                answers: [item.option_1, item.option_2, item.option_3, item.option_4],
                correctAnswer: item.answer
            })
            return 0
        })
        return formated_questions
    }

    async resetIfNewWeek(timestamp){
        //consultar tabela logs pra ver se tem log proximo em 24 horas
        //if reseta points_w de todo mundo
    }
    async resetIfNewMonth(timestamp){
        //consultar tabela logs pra ver se tem log proximo em 24 horas
        //if reseta points_m de todo mundo
    }
    async updatePlayerPoints(id, points){
        await knex('users').where('id', '=', id).update('points_t', points)
    }
    async getRankingTotal(request, response){
        const players = await knex('users').select('id', 'login', 'points_t').orderBy('points_t', 'desc').limit(10)
        response.json(players)
    }
}

module.exports = RankingController