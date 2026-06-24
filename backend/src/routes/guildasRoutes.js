const express = require('express');
const router = express.Router();

const guildasController = require('../controllers/guildasController');

router.get('/', guildasController.listar);
router.post('/', guildasController.cadastrar);

module.exports = router;