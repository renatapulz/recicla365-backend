const Usuario = require('../models/Usuario')
const PontoColeta = require('../models/PontoColeta')
const PontoCategoriaReciclavel = require('../models/PontoCategoriaReciclavel')
const CategoriaReciclavel = require('../models/CategoriaReciclavel')
const yup = require('yup')

class PontosController {
    async create(req, res) {
        const schema = yup.object().shape({
            logradouro: yup.string().required('Logradouro é um campo obrigatório.'),
            numero: yup.number().integer().required('Número é um campo obrigatório.'),
            complemento: yup.string(),
            bairro: yup.string().required('Bairro é um campo obrigatório.'),
            cidade: yup.string().required('Cidade é um campo obrigatório.'),
            estado: yup.string().required('Estado é um campo obrigatório.'),
            cep: yup.string().required('CEP é um campo obrigatório.'),
            latitude: yup.number(),
            longitude: yup.number(),
            url_google_maps: yup.string()
        });
        try {
            await schema.validate(req.body, { abortEarly: false });

            const usuario_id = req.usuarioId; // Obtendo o ID do usuário do middleware validaToken

            const pontoColetaComId = {
                ...req.body,
                usuario_id, // Adicionando o ID do usuário autenticado
            };
    

            const pontoColeta = await PontoColeta.create(pontoColetaComId);

            res.status(201).json({
                id: pontoColeta.id,
                usuario_id: pontoColeta.usuario_id,
                url_google_maps: pontoColeta.url_google_maps,
                createdAt: pontoColeta.createdAt
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro no cadastramento', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao criar ponto de coleta.', error });
            }
        }
    }

}

module.exports = new PontosController()