const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Importe o operador Op do Sequelize
const User = require('../models/User'); 
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário já existe pelo username ou email
    let existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Usuário já registrado com este username' });
      } else {
        return res.status(400).json({ error: 'Usuário já registrado com este email' });
      }
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Retorna o usuário criado
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

module.exports = router;



