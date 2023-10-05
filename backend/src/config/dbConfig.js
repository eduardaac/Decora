const mongoose = require('mongoose');
const dbConfig = process.env.DATABASE_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(dbConfig, options)
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados MongoDB.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
  });
