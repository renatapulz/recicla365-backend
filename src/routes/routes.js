const { Router } = require('express')

const routes = new Router()

/* Rotas aqui */

routes.get('/', (request, response) => {
    response.send("Bem vindo")
})

module.exports = routes