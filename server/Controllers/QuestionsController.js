const knex = require('../database/connection')

class QuestionsController{
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
        })
        response.json(formated_questions)
    }
}

module.exports = QuestionsController