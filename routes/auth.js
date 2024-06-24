const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de que o caminho está correto
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca o usuário pelo username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera um token de autenticação
    const token = jwt.sign({ id: user.id, username: user.username }, 'secretpassphrase', { expiresIn: '1h' });

    // Retorna o token JWT como resposta
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

module.exports = router;





