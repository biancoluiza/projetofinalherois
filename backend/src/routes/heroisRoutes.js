const express = require('express');
const router = express.Router();

const heroisController = require('../controllers/heroisController');

router.get('/', heroisController.listar);
router.post('/', heroisController.cadastrar);

module.exports = router;