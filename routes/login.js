const express = require('express');
const User = require('../models/User'); 
const router = express.Router();

// Rota para buscar todos os logins
router.get('/', async (req, res) => {
    try {
        const logins = await User.findAll({
            attributes: ['id','password', 'username']
            // Adicione mais filtros ou ordens conforme necessário
        });

        res.json(logins);
    } catch (error) {
        console.error('Erro ao buscar logins:', error);
        res.status(500).json({ error: 'Erro ao buscar logins' });
    }
});

module.exports = router;




