const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/logins'); // Importe as rotas de login
const cors = require('cors')

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configuração das rotas
app.use('/auth', authRoutes); // Rota para autenticação
app.use('/logins', loginRoutes); // Rota para listagem de logins

// Sincronização do banco de dados e inicialização do servidor
sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
