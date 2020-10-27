const express = require('express')
const QuestionsController = require('./Controllers/QuestionsController')

const routes = express.Router()

const questionsController = new QuestionsController()

routes.get('/quiz', questionsController.getQuiz)

module.exports = routes