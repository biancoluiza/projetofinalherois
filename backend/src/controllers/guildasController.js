const db = require('../config/db/db');

exports.listar = async (req, res) => {
    try {
        const [guildas] = await db.query(
            'SELECT * FROM guildas'
        );

        res.json(guildas);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar guildas'
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        await db.query(
            'INSERT INTO guildas (nome, descricao) VALUES (?, ?)',
            [nome, descricao]
        );

        res.status(201).json({
            mensagem: 'Guilda cadastrada com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar guilda'
        });
    }
};