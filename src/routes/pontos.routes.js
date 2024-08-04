const { Router } = require('express');
const PontosController = require('../controllers/PontosController');
const validaToken = require('../middlewares/validaToken');

const PontosRoutes = new Router();

PontosRoutes.get('/all', (req, res) => PontosController.getAll(req, res)
    /*
        #swagger.tags = ['Pontos de Coleta'],
        #swagger.description = 'Endpoint para listar todos os pontos de coleta',
        #swagger.responses[200] = {
            description: 'Lista de todos os pontos de coleta',
            schema: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        nomePonto: {
                            type: 'string',
                            example: 'Ponto de Coleta do Centro'
                        },
                        descricaoPonto: {
                            type: 'string',
                            example: 'Ponto de coleta localizado no centro de Floripa'
                        },
                        url_google_maps: {
                            type: 'string',
                            example: 'https://maps.google.com/?q=-27.592727173731348,-48.54311911270999'
                        }
                    }
                }
            }
        },
        #swagger.responses[500] = {
            description: 'Erro do servidor ao buscar os pontos de coleta',
            schema: {
                mensagem: 'Erro ao buscar os pontos de coleta.',
                error: {}
            }
        }
    */
);

PontosRoutes.get('/', validaToken, (req, res) => PontosController.getByUserId(req, res)
    /*
        #swagger.tags = ['Pontos de Coleta'],
        #swagger.description = 'Endpoint para listar todos os pontos de coleta de um usuário específico',
        #swagger.responses[200] = {
            description: 'Lista de pontos de coleta de um usuário',
            schema: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        nomePonto: {
                            type: 'string',
                            example: 'Ponto de Coleta do Centro'
                        },
                        descricaoPonto: {
                            type: 'string',
                            example: 'Ponto de coleta localizado no centro de Floripa'
                        },
                        logradouro: {
                            type: 'string',
                            example: 'Avenida Mauro Ramos'
                        },
                        numero: {
                            type: 'integer',
                            example: 12
                        },
                        complemento: {
                            type: 'string',
                            example: 'Ao lado do supermercado Imperatriz'
                        },
                        bairro: {
                            type: 'string',
                            example: 'Centro'
                        },
                        cidade: {
                            type: 'string',
                            example: 'Florianópolis'
                        },
                        estado: {
                            type: 'string',
                            example: 'SC'
                        },
                        cep: {
                            type: 'string',
                            example: '88020-300'
                        },
                        latitude: {
                            type: 'number',
                            example: -27.592727173731348
                        },
                        longitude: {
                            type: 'number',
                            example: -48.54311911270999
                        },
                        url_google_maps: {
                            type: 'string',
                            example: 'https://maps.google.com/?q=-27.592727173731348,-48.54311911270999'
                        },
                        categoriasReciclaveis: {
                            type: 'array',
                            items: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    }
                }
            }
        },
        #swagger.responses[404] = {
            description: 'Nenhum ponto de coleta cadastrado para este usuário.',
            schema: {
                mensagem: 'Nenhum ponto de coleta cadastrado para este usuário.'
            }
        },
        #swagger.responses[500] = {
            description: 'Erro do servidor ao buscar pontos de coleta',
            schema: {
                mensagem: 'Erro ao obter pontos de coleta',
                error: {}
            }
        }
    */
);

PontosRoutes.get('/:local_id', validaToken, (req, res) => PontosController.getDetailsPoints(req, res)
    /*
        #swagger.tags = ['Pontos de Coleta'],
        #swagger.description = 'Endpoint para obter detalhes de um ponto de coleta específico',
        #swagger.parameters['local_id'] = {
            in: 'path',
            description: 'Detalhes a partir de um ponto de coleta',
            required: true,
            type: 'integer',
            example: 1
        },
        #swagger.responses[200] = {
            description: 'Detalhes do ponto de coleta',
            schema: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1
                    },
                    nomePonto: {
                        type: 'string',
                        example: 'Ponto de Coleta do Centro'
                    },
                    descricaoPonto: {
                        type: 'string',
                        example: 'Ponto de coleta localizado no centro de Floripa'
                    },
                    logradouro: {
                        type: 'string',
                        example: 'Avenida Mauro Ramos'
                    },
                    numero: {
                        type: 'integer',
                        example: 12
                    },
                    complemento: {
                        type: 'string',
                        example: 'Ao lado do supermercado Imperatriz'
                    },
                    bairro: {
                        type: 'string',
                        example: 'Centro'
                    },
                    cidade: {
                        type: 'string',
                        example: 'Florianópolis'
                    },
                    estado: {
                        type: 'string',
                        example: 'SC'
                    },
                    cep: {
                        type: 'string',
                        example: '88020-300'
                    },
                    latitude: {
                        type: 'number',
                        example: -27.592727173731348
                    },
                    longitude: {
                        type: 'number',
                        example: -48.54311911270999
                    },
                    url_google_maps: {
                        type: 'string',
                        example: 'https://maps.google.com/?q=-27.592727173731348,-48.54311911270999'
                    },
                    categoriasReciclaveis: {
                        type: 'array',
                        items: {
                            type: 'integer',
                            example: 1
                        }
                    }
                }
            }
        },
        #swagger.responses[404] = {
            description: 'Ponto de coleta não encontrado ou não pertence ao usuário',
            schema: {
                mensagem: 'Ponto de coleta não encontrado ou não pertence ao usuário.'
            }
        },
        #swagger.responses[500] = {
            description: 'Erro do servidor ao obter detalhes do ponto de coleta',
            schema: {
                mensagem: 'Erro ao obter detalhes do ponto de coleta.',
                error: {}
            }
        }
    */
);

PontosRoutes.post('/', validaToken, (req, res) => PontosController.create(req, res)
    /*
        #swagger.tags = ['Pontos de Coleta']
        #swagger.description = 'Endpoint para criar um novo ponto de coleta'
        #swagger.parameters['ponto'] = {
            in: 'body',
            description: 'Informações do novo ponto de coleta',
            required: true,
            schema: {
                nomePonto: "Eco Ponto Itacorubi",
                descricaoPonto: "Ponto destinado aos moradores do Itacorubi e região pra fazer o descarte correto dos seus resíduos.",
                logradouro: "Rua Admar Gonzaga",
                numero: 3,
                complemento: "",
                bairro: "Itacorubi",
                cidade: "Florianópolis",
                estado: "SC",
                cep: "88034-000",
                latitude: -27.579712856521738,
                longitude: -48.507154239130436,
                categoriasReciclaveis: [1, 2, 3],
                url_google_maps: ""
            }
        }
        #swagger.responses[201] = {
            description: 'Ponto de coleta criado com sucesso',
            schema: {
                id: 1,
                nomePonto: "Eco Ponto Itacorubi",
                descricaoPonto: "Ponto destinado aos moradores do Itacorubi e região pra fazer o descarte correto dos seus resíduos.",
                logradouro: "Rua Admar Gonzaga",
                numero: 3,
                complemento: "",
                bairro: "Itacorubi",
                cidade: "Florianópolis",
                estado: "SC",
                cep: "88034-000",
                latitude: -27.579712856521738,
                longitude: -48.507154239130436,
                url_google_maps: ""
            }
        }
        #swagger.responses[400] = {
            description: 'Erro na validação dos dados fornecidos',
            schema: {
                mensagem: 'Dados inválidos.',
                errors: [
                    {
                        field: 'nomePonto',
                        message: 'Nome do ponto é um campo obrigatório.'
                    },
                    {
                        field: 'descricaoPonto',
                        message: 'Descrição do ponto é um campo obrigatório.'
                    },
                    {
                        field: 'logradouro',
                        message: 'Logradouro é um campo obrigatório.'
                    },
                    {
                        field: 'bairro',
                        message: 'Bairro é um campo obrigatório.'
                    },
                    {
                        field: 'cidade',
                        message: 'Cidade é um campo obrigatório.'
                    },
                    {
                        field: 'estado',
                        message: 'Estado é um campo obrigatório.'
                    },
                    {
                        field: 'cep',
                        message: 'CEP é um campo obrigatório.'
                    },
                    {
                        field: 'categoriasReciclaveis',
                        message: 'O tipo de material aceito é um campo obrigatório.'
                    }
                ]
            }
        }
        #swagger.responses[500] = {
            description: 'Erro do servidor ao criar o ponto de coleta',
            schema: {
                mensagem: 'Erro ao criar ponto de coleta.',
                error: {}
            }
        }
    */
);

PontosRoutes.put('/:local_id', validaToken, (req, res) => PontosController.update(req, res)
    /*
    #swagger.tags = ['Pontos de Coleta']
    #swagger.description = 'Endpoint para atualizar um ponto de coleta existente'
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do ponto de coleta para atualizar',
        required: true,
        type: 'integer',
        example: 1
    }
    #swagger.parameters['ponto'] = {
        in: 'body',
        description: 'Informações do ponto de coleta a ser atualizado',
        required: true,
        schema: {
                nomePonto: "Eco ponto Itacorubi",
                descricaoPonto: "Ponto destinado aos moradores do Itacorubi e região pra fazer o descarte correto dos seus resíduos.",
                logradouro: "Rua Admar Gonzaga",
                numero: 123,
                complemento: "",
                bairro: "Itacorubi",
                cidade: "Florianópolis",
                estado: "SC",
                cep: "88034-000",
                latitude: -27.5797,
                longitude: -48.5072,
                categoriasReciclaveis: [1, 2],
                url_google_maps: "https://maps.google.com/?q=-27.5797,-48.5072"
        }
    }
    #swagger.responses[200] = {
        description: 'Ponto de coleta atualizado com sucesso',
        schema: {
            id: 1,
            nomePonto: "Eco ponto Itacorubi",
            descricaoPonto: "Ponto destinado aos moradores do Itacorubi e região pra fazer o descarte correto dos seus resíduos.",
            logradouro: "Rua Admar Gonzaga",
            numero: 123,
            complemento: "",
            bairro: "Itacorubi",
            cidade: "Florianópolis",
            estado: "SC",
            cep: "88034-000",
            latitude: -27.5797,
            longitude: -48.5072,
            url_google_maps: "https://maps.google.com/?q=-27.5797,-48.5072",
            categoriasReciclaveis: [1, 2]
        }
    }
    #swagger.responses[400] = {
        description: 'Erro de validação dos dados fornecidos',
        schema: {
            mensagem: 'Dados inválidos.',
            errors: [
                {
                    field: 'nomePonto',
                    message: 'Nome do ponto é um campo obrigatório.'
                },
                {
                    field: 'descricaoPonto',
                    message: 'Descrição do ponto é um campo obrigatório.'
                },
                {
                    field: 'logradouro',
                    message: 'Logradouro é um campo obrigatório.'
                },
                {
                    field: 'bairro',
                    message: 'Bairro é um campo obrigatório.'
                },
                {
                    field: 'cidade',
                    message: 'Cidade é um campo obrigatório.'
                },
                {
                    field: 'estado',
                    message: 'Estado é um campo obrigatório.'
                },
                {
                    field: 'cep',
                    message: 'CEP é um campo obrigatório.'
                },
                {
                    field: 'categoriasReciclaveis',
                    message: 'O tipo de material aceito é um campo obrigatório.'
                }
            ]
        }
    }
    #swagger.responses[404] = {
        description: 'Ponto de coleta não encontrado ou não pertence ao usuário',
        schema: {
            mensagem: 'Ponto de coleta não encontrado ou não pertence ao usuário.'
        }
    }
    #swagger.responses[500] = {
        description: 'Erro do servidor ao atualizar o ponto de coleta',
        schema: {
            mensagem: 'Erro ao atualizar o ponto de coleta.',
            error: {}
        }
    }
*/
);

PontosRoutes.delete('/:local_id', validaToken, (req, res) => PontosController.delete(req, res)
    /*
        #swagger.tags = ['Pontos de Coleta'],
        #swagger.description = 'Endpoint para deletar um ponto de coleta',
        #swagger.parameters['local_id'] = {
            in: 'path',
            description: 'ID do ponto de coleta a ser deletado',
            required: true,
            type: 'integer',
            example: 1
        },
        #swagger.responses[204] = {
            description: 'Ponto de coleta deletado com sucesso',
            schema: {
                message: 'Ponto de coleta deletado com sucesso.'
            }
        },
        #swagger.responses[404] = {
            description: 'Ponto de coleta não encontrado ou não pertence ao usuário',
            schema: {
                mensagem: 'Ponto de coleta não encontrado ou não pertence ao usuário.'
            }
        },
        #swagger.responses[500] = {
            description: 'Erro do servidor ao deletar o ponto de coleta',
            schema: {
                mensagem: 'Erro ao deletar o ponto de coleta.',
                error: {}
            }
        }
    */
);

module.exports = PontosRoutes;
