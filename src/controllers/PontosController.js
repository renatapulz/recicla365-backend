const PontoColeta = require('../models/PontoColeta')
const PontoCategoriaReciclavel = require('../models/PontoCategoriaReciclavel')
const CategoriaReciclavel = require('../models/CategoriaReciclavel')
const yup = require('yup')
const { getCoordinates, getGoogleMapsLink } = require('../services/map.service');

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
            latitude: yup.number().nullable(),
            longitude: yup.number().nullable()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const usuario_id = req.usuarioId; // Obtendo o ID do usuário do middleware validaToken
            const { cep, latitude, longitude, categoriasReciclaveis } = req.body;
            
            let pontoColetaData = {
                ...req.body,
                usuario_id, // Adicionando o ID do usuário autenticado
            };

            // Se a latitude e longitude não forem fornecidas, busca pela API
            if (!latitude || !longitude) {
                const local = await getCoordinates(cep);
                pontoColetaData = {
                    ...pontoColetaData,
                    latitude: local.lat,
                    longitude: local.lon,
                };
            }

            const categoriasValidas = await CategoriaReciclavel.findAll({
                where: { id: categoriasReciclaveis }
            });
            if (categoriasValidas.length !== categoriasReciclaveis.length) {
                return res.status(400).json({ mensagem: 'Um ou mais tipos de materiais recicláveis não foram cadastrados.' });
            }

            const pontoColeta = await PontoColeta.create(pontoColetaData);

            // Gera a URL do Google Maps e atualiza o ponto de coleta
            const googleMapsLink = await getGoogleMapsLink({ lat: pontoColeta.latitude, lon: pontoColeta.longitude });
            pontoColeta.url_google_maps = googleMapsLink;
            await pontoColeta.save();

            // Adiciona as associações na tabela intermediária
            const associacoes = categoriasReciclaveis.map(idCategoria => ({
                ponto_coleta_id: pontoColeta.id,
                id_material: idCategoria
            }));

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

    async update(req, res) {
        const schema = yup.object().shape({
            nomePonto: yup.string(),
            descricaoPonto: yup.string(),
            logradouro: yup.string(),
            numero: yup.number().integer(),
            complemento: yup.string(),
            bairro: yup.string(),
            cidade: yup.string(),
            estado: yup.string(),
            cep: yup.string(),
            categoriasReciclaveis: yup.array()
                .of(yup.number().integer())
                .test('not-empty', 'O tipo de material aceito não pode ser um array vazio.', value => value === undefined || value.length > 0),
            latitude: yup.number(),
            longitude: yup.number(),
            url_google_maps: yup.string()
        });

        try {
            const { local_id } = req.params;
            const usuario_id = req.usuarioId;
            const { nomePonto, descricaoPonto, logradouro, numero, complemento, bairro, cidade, estado, cep, categoriasReciclaveis, latitude, longitude, url_google_maps } = req.body;

            await schema.validate(req.body, { abortEarly: false });

            const ponto = await PontoColeta.findOne({
                where: { id: local_id, usuario_id }
            });

            if (!ponto) {
                return res.status(404).json({ message: 'Ponto de coleta não encontrado ou não pertence ao usuário.' });
            }

            // Atualiza os campos do ponto de coleta
            ponto.nomePonto = nomePonto || ponto.nomePonto;
            ponto.descricaoPonto = descricaoPonto || ponto.descricaoPonto;
            ponto.logradouro = logradouro || ponto.logradouro;
            ponto.numero = numero || ponto.numero;
            ponto.complemento = complemento || ponto.complemento;
            ponto.bairro = bairro || ponto.bairro;
            ponto.cidade = cidade || ponto.cidade;
            ponto.estado = estado || ponto.estado;
            ponto.cep = cep || ponto.cep;
            ponto.latitude = latitude || ponto.latitude;
            ponto.longitude = longitude || ponto.longitude;
            ponto.url_google_maps = url_google_maps || ponto.url_google_maps;

            await ponto.save();

            // Se categoriasReciclaveis está definido e não é um array vazio, atualiza as categorias
            if (categoriasReciclaveis !== undefined) {
                if (categoriasReciclaveis.length > 0) {
                    await PontoCategoriaReciclavel.destroy({
                        where: { ponto_coleta_id: ponto.id }
                    });

                    const categoriasValidas = await CategoriaReciclavel.findAll({
                        where: { id: categoriasReciclaveis }
                    });

                    if (categoriasValidas.length !== categoriasReciclaveis.length) {
                        return res.status(400).json({ mensagem: 'Um ou mais tipos de materiais recicláveis não foram cadastrados.' });
                    }

                    const associacoes = categoriasReciclaveis.map(idCategoria => ({
                        ponto_coleta_id: ponto.id,
                        id_material: idCategoria
                    }));

                    await PontoCategoriaReciclavel.bulkCreate(associacoes);
                } else {
                    return res.status(400).json({ mensagem: 'O tipo de material aceito não pode ser um array vazio.' });
                }
            }

            res.status(200).json({ ponto, categoriasReciclaveis });

        } catch (error) {
            console.error('Erro ao atualizar ponto de coleta:', error);
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro na atualização', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao atualizar o ponto de coleta.', error });
            }
        }
    }


    async getAll(req, res) {
        try {
            const pontos = await PontoColeta.findAll();
            const pontosFormatados = pontos.map(ponto => ({
                nomePonto: ponto.nomePonto,
                descricaoPonto: ponto.descricaoPonto,
                url_google_maps: ponto.url_google_maps
            }));
            res.status(200).json(pontosFormatados);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os pontos de coleta.', error });
        }
    }

    async getByUserId(req, res) {
        try {
            const usuario_id = req.usuarioId;
            const pontos = await PontoColeta.findAll({ where: { usuario_id } });
            if (pontos.length === 0) {
                return res.status(404).json({ message: 'Nenhum ponto de coleta cadastrado para este usuário.' });
            } else {
                res.status(200).json(pontos);
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter pontos de coleta', error });
        }
    }

    async getDetailsPoints(req, res) {
        try {
            const { local_id } = req.params;
            const usuario_id = req.usuarioId;

            const ponto = await PontoColeta.findOne({
                where: { id: local_id, usuario_id }
            });

            if (!ponto) {
                return res.status(404).json({ message: 'Ponto de coleta não encontrado ou não pertence ao usuário.' });
            } else {
                res.status(200).json(ponto);
            }

        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter detalhes do ponto de coleta.', error });
        }
    }

    async delete(req, res) {
        try {
            const { local_id } = req.params;
            const usuario_id = req.usuarioId;

            const ponto = await PontoColeta.findOne({
                where: { id: local_id, usuario_id }
            });

            if (!ponto) {
                return res.status(404).json({ message: 'Ponto de coleta não encontrado ou não pertence ao usuário.' });
            } else {
                await ponto.destroy();
                res.status(204).send();
            }

        } catch (error) {
            console.error('Erro ao deletar o ponto de coleta:', error);
            res.status(500).json({ message: 'Erro ao deletar o ponto de coleta.', error });
        }
    }

}

module.exports = new PontosController()