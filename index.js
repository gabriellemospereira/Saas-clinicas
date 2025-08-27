const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');




const connectToDatabase = require('./modules/src/database/connect');
const UserModel = require('./modules/models/user.model');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // middleware para analisar JSON no corpo das requisições

app.set('view engine', 'ejs');
app.set("views", "modules/src/views");

app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(user);
    } catch (error) {
           res.status(500).send(error.message);
    }
});


app.get("/views/users", async (req, res) => {
    const users = await UserModel.find({});
    
    res.render("index", {users});
})

// Rota para deletar usuário
app.delete('/users/:id', async (req, res) => {
    try{
        const id = req.params.id;

        const user = await UserModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Rota para buscar usuário por ID
app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verifica se o ID é válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Rota para criar usuário
app.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota para listar usuários
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Rota raiz
app.get("/", (req, res) => {
    res.json({ message: 'API funcionando!', status: 'OK' });
});

// Função para iniciar a aplicação
async function startApplication() {
    try {
        await connectToDatabase(); // aguarda a conexão
        console.log('Conectado ao banco de dados com sucesso!');
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
        process.exit(1); // encerra o processo se não conseguir iniciar             
    }
}

// Inicia a aplicação
startApplication();