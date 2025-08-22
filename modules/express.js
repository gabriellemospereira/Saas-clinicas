const express = require('express');
const cors = require('cors');
const UserModel = require('./modules/src/database/models/user.model');
const connectToDatabase = require('./modules/src/database/connect');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.groupCollapsed(`Request type: ${req.method}`);
    console.log(`Content-type:  ${req.headers["content-type"]}`);
    console.log(`Date: ${new Date()}`)
})

// Conectar ao banco (adicione esta função se não tiver)
async function startServer() {
    try {
        await connectToDatabase();
        console.log('✅ Conectado ao banco de dados');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao conectar com o banco:', error);
    }
}

// Rota para listar TODOS os usuários - CORRIGIDA
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find(); // ✅ Correção aqui
        res.status(200).json(users); // ✅ Correção aqui
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(user);
    } catch (error) {
           res.status(500).send(error.message);
    }
});

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


// Rota para buscar usuário por ID - CORRIGIDA
app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;      
        const user = await UserModel.findById(id); // ✅ Correção aqui

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(user); // ✅ Correção aqui (de users para user)
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Rota para criar usuário - JÁ ESTAVA CORRETA
app.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Iniciar servidor
startServer();