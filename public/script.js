const url = "/usuarios";

function mostrar(dados) {
    document.getElementById("resultado").textContent =
        JSON.stringify(dados, null, 2); //Isso vai pegar o objeto e transoforma na string do JSON, retorna string
}

async function criar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const resposta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email })
    });

    const dados = await resposta.json();
    mostrar(dados);
}

async function listar() {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    mostrar(dados);
}

async function buscar() {
    const id = document.getElementById("id").value;

    const resposta = await fetch(`${url}/${id}`);
    const dados = await resposta.json();
    mostrar(dados);
}

async function atualizar() {
    const id = document.getElementById("id").value;
    const novoNome = document.getElementById("novoNome").value;

    const resposta = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: novoNome })
    });

    const dados = await resposta.json();
    mostrar(dados);
}

async function deletar() {
    const id = document.getElementById("id").value;

    const resposta = await fetch(`${url}/${id}`, {
        method: "DELETE"
    });

    const dados = await resposta.json();
    mostrar(dados);
}