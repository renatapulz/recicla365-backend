const { Router } = require('express')
const PontosController = require('../controllers/PontosController')
const validaToken = require('../middlewares/validaToken')

const PontosRoutes = new Router()

PontosRoutes.get('/all', (req, res) => PontosController.getAll(req, res));
PontosRoutes.get('/', validaToken, (req, res) => PontosController.getByUserId(req, res));
PontosRoutes.get('/:local_id', validaToken, (req, res) => PontosController.getDetailsPoints(req, res));
PontosRoutes.post('/', validaToken, (req, res) => PontosController.create(req, res));
PontosRoutes.put('/', validaToken, (req, res) => PontosController.update(req, res));
PontosRoutes.delete('/:id', validaToken, (req, res) => PontosController.delete(req, res));

module.exports = PontosRoutes