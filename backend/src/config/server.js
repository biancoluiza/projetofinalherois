const express = require('express');
const cors = require('cors');
const db = require('./db/db');

const usuariosRoutes = require('../routes/usuariosRoutes');
const guildasRoutes = require('../routes/guildasRoutes');
const heroisRoutes = require('../routes/heroisRoutes');
const missoesRoutes = require('../routes/missoesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'API do portal de heróis online' });
});

app.use('/usuarios', usuariosRoutes);
app.use('/guildas', guildasRoutes);
app.use('/herois', heroisRoutes);
app.use('/missoes', missoesRoutes);

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        await db.query(
            `UPDATE usuarios
             SET nome = ?, email = ?, senha = ?
             WHERE id_usuario = ?`,
            [nome, email, senha, id]
        );

        res.json({
            mensagem: 'Usuário atualizado com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao atualizar usuário'
        });
    }
});

app.put('/guildas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        await db.query(
            `UPDATE guildas
             SET nome = ?, descricao = ?
             WHERE id_guilda = ?`,
            [nome, descricao, id]
        );

        res.json({
            mensagem: 'Guilda atualizado com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao atualizar a guilda'
        });
    }
});

app.put('/herois/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, classe, poder, avatar_url, id_guilda, id_usuario } = req.body;

        await db.query(
            `UPDATE herois
             SET nome = ?, classe = ?, poder = ?, avatar_url = ?, id_guilda = ?, id_usuario = ?
             WHERE id_heroi = ?`,
            [nome, classe, poder, avatar_url, id_guilda, id_usuario, id]
        );

        res.json({
            mensagem: 'Herói atualizado com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao atualizar herói'
        });
    }
});

app.put('/missoes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descricao, recompensa_ouro, status } = req.body;

        await db.query(
            `UPDATE missoes
             SET descricao = ?, recompensa_ouro = ?, status = ?
             WHERE id_missao = ?`,
            [descricao, recompensa_ouro, status, id]
        );

        res.json({
            mensagem: 'Missão atualizada com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao atualizar missão'
        });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM usuarios WHERE id_usuario = ?',
            [id]
        );

        res.json({
            mensagem: 'Usuário excluído com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao excluir usuário'
        });
    }
});

app.delete('/guildas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM guildas WHERE id_guilda = ?',
            [id]
        );

        res.json({
            mensagem: 'Guilda excluída com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao excluir guilda'
        });
    }
});

app.delete('/herois/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM herois WHERE id_heroi = ?',
            [id]
        );

        res.json({
            mensagem: 'Herói excluído com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao excluir herói'
        });
    }
});

app.delete('/missoes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            'DELETE FROM missoes WHERE id_missao = ?',
            [id]
        );

        res.json({
            mensagem: 'Missão excluída com sucesso!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao excluir missão'
        });
    }
});

app.get('/herois-guildas', async (req, res) => {
    try {
        const [dados] = await db.query(`
            SELECT
                h.id_heroi,
                h.nome AS heroi,
                h.classe,
                g.nome AS guilda
            FROM herois h
            INNER JOIN guildas g
                ON h.id_guilda = g.id_guilda
        `);

        res.json(dados);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao buscar dados'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});

