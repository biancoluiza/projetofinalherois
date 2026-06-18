const express = require('express');
const db = require('./db/db');

const app = express();
app.use(express.json());

app.get('/usuarios', async (req, res) => {
    try {
        const [usuarios] = await db.query('SELECT * FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "erro ao conectar com o banco"});
    }
});
app.get('/guildas', async (req, res) => {
    try {
        const [guildas] = await db.query('SELECT * FROM guildas');
        res.json(guildas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "erro ao conectar com o banco"});
    }
});
app.get('/herois', async (req, res) => {
    try {
        const [herois] = await db.query('SELECT * FROM herois');
        res.json(herois);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "erro ao conectar com o banco"});
    }
});
app.get('/missoes', async (req, res) => {
    try {
        const [missoes] = await db.query('SELECT * FROM missoes');
        res.json(missoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "erro ao conectar com o banco"});
    }
});


app.post('/usuarios', async (req, res) => {
    try {
        const {
            nome, email, senha
        } = req.body
        await db.query(`INSERT INTO usuarios (nome, email, senha) 
            VALUES (?, ?, ?)`,
        [nome, email, senha]
    );

    res.status(201).json({
        mensagem:'Usuário cadastrado com sucesso!'
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar usuário'
        });
    }
});

app.post('/guildas', async (req, res) => {
    try {
        const {
            nome, descricao
        } = req.body
        await db.query(`INSERT INTO guildas (nome, descricao)
            VALUES (?, ?)`,
        [nome, descricao]
    );

    res.status(201).json({
        mensagem: 'Guilda cadastrada com sucesso!'
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: 'Erro ao cadastrar guilda'
        })
    }
});

app.post('/herois', async (req, res) => {
    try {
        const {
            nome, classe, poder, avatar_url, id_guilda, id_usuario
        } = req.body
        await db.query(`INSERT INTO herois (nome, classe, poder, avatar_url, id_guilda, id_usuario)
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
});

app.post('/missoes', async (req, res) => {
    try {
        const {
            descricao, recompensa_ouro, id_heroi, status
        } = req.body
        await db.query(`INSERT INTO missoes (descricao, recompensa_ouro, id_heroi, status)
            VALUES (?, ?, ?, ?)`,
            [descricao, recompensa_ouro, id_heroi, status]
        );

        res.status(201).json ({
            mensagem: 'Missão cadastrada com sucesso!'
        });
    } catch(error) {
        console.error(error);
        res.status(500).json ({
            erro: 'Erro ao cadastrar missão'
        });
    }
});

app.listen(3000, () => {
    console.log('ligado')
});