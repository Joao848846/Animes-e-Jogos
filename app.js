const express = require('express');
const sequelize = require('./config/database');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const cors = require('cors');

const app = express();

// Middleware para interpretar JSON
app.use(express.json());


app.use(cors());

// Configuração das rotas
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/logins', loginRoutes);

// Sincronizar o banco de dados na port 3000
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});

