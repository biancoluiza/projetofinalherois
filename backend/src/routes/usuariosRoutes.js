const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.cadastrar);

module.exports = router;