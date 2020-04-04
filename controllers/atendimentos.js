const Atendimento = require("../models/atendimentos")

module.exports = app => {
    //Criação de rota
    app.get("/atendimentos", (req, resp) => {
        resp.send("Você está na rota de atendimentos com método GET.")
    })

    app.post("/atendimentos", (req, resp) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
        resp.send("Você está na rota de atendimentos com método POST.")
    })
}

// Para que o "req", consiga traduzir o que está no Body de um html por exemplo e mostrar no console, é necessário a instalação do body-parser
//npm install body-parser