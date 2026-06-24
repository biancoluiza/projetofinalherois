const db = require('../config/db/db');

exports.listar = async (req, res) => {
    try {
        const [herois] = await db.query(
            'SELECT * FROM herois'
        );

        res.json(herois);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar heróis'
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const {
            nome,
            classe,
            poder,
            avatar_url,
            id_guilda,
            id_usuario
        } = req.body;

        await db.query(
            `INSERT INTO herois
            (nome, classe, poder, avatar_url, id_guilda, id_usuario)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, classe, poder, avatar_url, id_guilda, id_usuario]
        );

        res.status(201).json({
            mensagem: 'Herói cadastrado com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar herói'
        });
    }
};