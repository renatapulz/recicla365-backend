const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')
const validaToken = require('../middlewares/validaToken')

const UsuariosRoutes = new Router()

UsuariosRoutes.post('/', (req, res) => UsuariosController.register(req, res)
    /*
        #swagger.tags = ['Usuários']
        #swagger.description = 'Endpoint para registrar um novo usuário'
        #swagger.parameters['usuario'] = {
            in: 'body',
            description: 'Informações do novo usuário',
            required: true,
            schema: {
                $nome: "João da Silva",
                $sexo: "masculino",
                $cpf: "12345678900",
                $senha: "teste123",
                $email: "teste@gmail.com",
                $data_de_nascimento: "1990-01-01",
                $logradouro: "Rua Salvatina Feliciana dos Santos",
                $numero: 222,
                $complemento: "Apto 901 B",
                $bairro: "Itacorubi",
                $cidade: "Florianópolis",
                $estado: "SC",
                $cep: "88034-600"
            }
        }
        #swagger.responses[201] = {
            description: 'Usuário cadastrado com sucesso',
            schema: {
                id: 1,
                nome: "João da Silva",
                email: "teste@gmail.com",
                createdAt: "2024-08-02T12:00:00Z"
            }
        }
        #swagger.responses[400] = {
                description: 'Erro de validação ou dados duplicados',
                schema: {
                    mensagem: 'Erro no cadastramento',
                    errors: [
                        {
                            field: 'nome',
                            message: 'Nome é um campo obrigatório.'
                        },
                        {
                            field: 'email',
                            message: 'Email já cadastrado.'
                        },
                        {
                            field: 'cpf',
                            message: 'CPF já cadastrado.'
                        }
                    ]
                }
            }
        #swagger.responses[500] = {
            description: 'Erro do servidor ao cadastrar o usuário',
            schema: {
                mensagem: 'Erro ao cadastrar o usuário.',
                error: {}
            }
        }
    */
);

UsuariosRoutes.delete('/:id', validaToken, (req, res) => UsuariosController.deleteUser(req, res)
    /*
        #swagger.tags = ['Usuários']
        #swagger.description = 'Endpoint para deletar um usuário específico'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do usuário a ser deletado',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.responses[204] = {
            description: 'Usuário deletado com sucesso.'
        }
        #swagger.responses[400] = {
            description: 'Usuário possui pontos de coleta cadastrados. Por favor, exclua todos os pontos de coleta antes de deletar a conta.',
            schema: {
            mensagem: 'Você possui pontos de coleta cadastrados. Por favor, exclua todos os pontos de coleta antes de deletar sua conta.'
            }
        }
        #swagger.responses[403] = {
            description: 'Ação não permitida',
            schema: {
                mensagem: 'Ação não permitida. Você só pode deletar sua própria conta.'
            }
        }
        #swagger.responses[404] = {
            description: 'Usuário não encontrado',
            schema: {
                mensagem: 'Usuário não encontrado.'
            }
        }
        #swagger.responses[500] = {
            description: 'Erro ao deletar o usuário',
            schema: {
                mensagem: 'Erro ao deletar o usuário.',
                error: {}
            }
        }
    */
);

module.exports = UsuariosRoutes