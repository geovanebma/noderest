const Atendimento = require("../models/atendimentos")

module.exports = app => {
    //Criação de rota
    app.get("/atendimentos", (req, resp) => {
        Atendimento.lista(resp)
    })

    app.get("/atendimentos/:id", (req, resp) => {
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id, resp)
    })

    app.post("/atendimentos", (req, resp) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, resp)
    })

    app.patch("/atendimentos/:id", (req, resp) =>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id, valores, resp)
    })

    app.delete("/atendimentos/:id", (req, resp) =>{
        const id = parseInt(req.params.id)
        Atendimento.deleta(id, resp)
    })
}

// Para que o "req", consiga traduzir o que está no Body de um html por exemplo e mostrar no console, é necessário a instalação do body-parser
//npm install body-parser