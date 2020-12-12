const express = require('express')
const QuestionsController = require('./Controllers/QuestionsController')
const UsersController = require('./Controllers/UsersController')
const RankingController = require('./Controllers/RankingController')

const routes = express.Router()

const questionsController = new QuestionsController()
const usersController = new UsersController()
const rankingController = new RankingController()

routes.get('/quiz', questionsController.getQuiz)
routes.post('/services-login', usersController.login)
routes.post('/services-signup', usersController.signup)
routes.get('/ranking_t', rankingController.getRankingTotal)

// routes.get('*', function(req, res){
//     res.redirect('/')
// })
module.exports = routes