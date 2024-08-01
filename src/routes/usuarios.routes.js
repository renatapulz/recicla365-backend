const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')

const UsuariosRoutes = new Router()

UsuariosRoutes.post('/', (req, res) => UsuariosController.register(req, res));
UsuariosRoutes.delete('/:id', (req, res) => UsuariosController.deleteUser(req, res));

module.exports = UsuariosRoutes