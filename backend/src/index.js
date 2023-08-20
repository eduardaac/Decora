const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');
require('./config/dbConfig');

// Configurar o CORS para permitir solicitações da origem do aplicativo React
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(routes);

app.listen(3333);
