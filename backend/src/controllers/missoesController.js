const db = require('../config/db/db');

exports.listar = async (req, res) => {
    try {
        const [missoes] = await db.query(
            'SELECT * FROM missoes'
        );

        res.json(missoes);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar missões'
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const {
            descricao,
            recompensa_ouro,
            id_heroi,
            status
        } = req.body;

        await db.query(
            `INSERT INTO missoes
            (descricao, recompensa_ouro, id_heroi, status)
            VALUES (?, ?, ?, ?)`,
            [descricao, recompensa_ouro, id_heroi, status]
        );

        res.status(201).json({
            mensagem: 'Missão cadastrada com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar missão'
        });
    }
};