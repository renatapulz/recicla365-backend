const Usuario = require('../models/Usuario')
const yup = require('yup')
const { Op } = require('sequelize');

class UsuariosController {
    async register(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required('Nome é um campo obrigatório.'),
            sexo: yup.string().oneOf(['feminino', 'masculino', 'outro']).required('Sexo é um campo obrigatório.'),
            cpf: yup.string().length(11, 'CPF deve ter 11 caracteres.').required('CPF é um campo obrigatório.'),
            senha: yup.string().required('Senha é um campo obrigatório.'),
            email: yup.string().email().required('Email é um campo obrigatório.'),
            data_de_nascimento: yup.date().required('Data de nascimento é um campo obrigatório.'),
            logradouro: yup.string().required('Logradouro é um campo obrigatório.'),
            numero: yup.number().required('Número é um campo obrigatório.'),
            complemento: yup.string(),
            bairro: yup.string().required('Bairro é um campo obrigatório.'),
            cidade: yup.string().required('Cidade é um campo obrigatório.'),
            estado: yup.string().required('Estado é um campo obrigatório.'),
            cep: yup.string().required('CEP é um campo obrigatório.')
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const usuarioExistente = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { cpf: req.body.cpf },
                        { email: req.body.email }
                    ]
                }
            });

            if (usuarioExistente) {
                return res.status(400).json({
                    mensagem: 'Email ou CPF já cadastrados.'
                });
            }

            const usuario = await Usuario.create(req.body);
            res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            })
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro no cadastramento', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
            }
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }

            await usuario.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar usuário.', error });
        }
    }
}

module.exports = new UsuariosController()