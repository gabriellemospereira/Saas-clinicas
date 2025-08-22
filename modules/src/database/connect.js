const mongoose = require('mongoose');

const connecToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejsdicasparadev.pdpfdme.mongodb.net/`
    );
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // encerra o processo se não conseguir conectar
  }
};

module.exports = connecToDatabase;
