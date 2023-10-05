const mongoose = require('mongoose');
const dbConfig = "mongodb+srv://decoraBD:decora123@cluster0.jmp65vb.mongodb.net/mydatabase?retryWrites=true&w=majority";

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
