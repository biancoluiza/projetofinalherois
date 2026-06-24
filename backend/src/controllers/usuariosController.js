const db = require('../config/db/db.js');

exports.listar = async (req, res) => {
    try {
        const [usuarios] = await db.query(
            'SELECT * FROM usuarios'
        );

        res.json(usuarios);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar usuários'
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        await db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar usuário'
        });
    }
};

