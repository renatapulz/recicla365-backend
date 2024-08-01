const { Router } = require('express')
const UsuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const PontosRoutes = require('./pontos.routes')

const routes = new Router()

routes.use('/usuario', UsuariosRoutes)
routes.post('/login', LoginController.login)
routes.use('/local', PontosRoutes)

module.exports = routes