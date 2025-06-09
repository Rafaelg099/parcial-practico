const express = require('express');
const router = express.Router();
const { calcularRuta } = require('../controllers/routeController');

router.post('/calculate', calcularRuta);

module.exports = router;

