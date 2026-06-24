const express = require('express');
const router = express.Router();

const missoesController = require('../controllers/missoesController');

router.get('/', missoesController.listar);
router.post('/', missoesController.cadastrar);

module.exports = router;