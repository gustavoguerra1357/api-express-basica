const express = require("express");
const path = require("path");

const app = express();
app.use(express.json()); // importante para receber JSON
app.use(express.static(path.join(__dirname, "public")));

const usuarios = []; // "banco de dados" fake
let proximoId = 1; // controla o ID


// READ (Listar usuários)
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// CREATE (Criar usuário)
app.post("/usuarios", (req, res) => {

    proximoId++; // incrementa para o próximo usuário
    
    const { nome , email } = req.body
    const novoUsuario = {
        id: proximoId,
        nome: nome,
        email: email,
    };


    usuarios.push(novoUsuario);

    res.status(201);
    res.json(novoUsuario);
});


// READ por ID
app.get("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    usuario.nome = req.body.nome;
    usuario.email = req.body.email;

    res.json(usuario);
});
// DELETE
app.delete("/usuarios/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    usuarios.splice(indice, 1);

    res.json({ mensagem: "Usuário removido" });
});




app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000, http://localhost:3000");
});