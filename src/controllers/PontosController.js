const PontoColeta = require('../models/PontoColeta')
const PontoCategoriaReciclavel = require('../models/PontoCategoriaReciclavel')
const CategoriaReciclavel = require('../models/CategoriaReciclavel')
const yup = require('yup')

class PontosController {
    async create(req, res) {
        const schema = yup.object().shape({
            nomePonto: yup.string().required('O nome do ponto de coleta é um campo obrigatório.'),
            descricaoPonto: yup.string().required('A descrição do ponto de coleta é um campo obrigatório.'),
            logradouro: yup.string().required('Logradouro é um campo obrigatório.'),
            numero: yup.number().integer().required('Número é um campo obrigatório.'),
            complemento: yup.string(),
            bairro: yup.string().required('Bairro é um campo obrigatório.'),
            cidade: yup.string().required('Cidade é um campo obrigatório.'),
            estado: yup.string().required('Estado é um campo obrigatório.'),
            cep: yup.string().required('CEP é um campo obrigatório.'),
            categoriasReciclaveis: yup.array()
                .of(yup.number().integer())
                .min(1, 'O tipo de material aceito é um campo obrigatório.') // Obrigatório pelo menos um material
                .required('O tipo de material aceito é um campo obrigatório.'),
            latitude: yup.number(),
            longitude: yup.number(),
            url_google_maps: yup.string()
        });
        try {
            console.log('Dados da requisição:', req.body);
            await schema.validate(req.body, { abortEarly: false });

            const usuario_id = req.usuarioId; // Obtendo o ID do usuário do middleware validaToken
            console.log('ID do usuário:', usuario_id);
            const pontoColetaComId = {
                ...req.body,
                usuario_id, // Adicionando o ID do usuário autenticado
            };

            const { categoriasReciclaveis } = req.body; // desestruturo os tipos de material do restante
            console.log('Categorias recicláveis:', categoriasReciclaveis);
            const categoriasValidas = await CategoriaReciclavel.findAll({
                where: { id: categoriasReciclaveis }
            });
            console.log('Categorias válidas encontradas:', categoriasValidas);
            if (categoriasValidas.length !== categoriasReciclaveis.length) {
                return res.status(400).json({ mensagem: 'Um ou mais tipos de materiais recicláveis não foram cadastrados.' });
            }

            const pontoColeta = await PontoColeta.create(pontoColetaComId);

            console.log('Ponto de coleta criado:', pontoColeta);

            // Adiciona as associações na tabela intermediária
            const associacoes = categoriasReciclaveis.map(idCategoria => ({
                ponto_coleta_id: pontoColeta.id,
                id_material: idCategoria
            }));

            console.log('Associações a serem criadas:', associacoes);
            await PontoCategoriaReciclavel.bulkCreate(associacoes);

            res.status(201).json({
                id: pontoColeta.id,
                nome: pontoColeta.nomePonto,
                descricao: pontoColeta.descricaoPonto,
                categoriasReciclaveis,
                usuario_id: pontoColeta.usuario_id,
                url_google_maps: pontoColeta.url_google_maps,
                createdAt: pontoColeta.createdAt
            });
        } catch (error) {
            console.error('Erro ao criar ponto de coleta:', error);
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro no cadastramento', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao criar ponto de coleta.', error });
            }
        }
    }

}

module.exports = new PontosController()