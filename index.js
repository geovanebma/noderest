//De inicio é bom instalar o express
//npm install express

const express = require("express")
const app = express()

//Criação do servidor
app.listen(3000, function(){
    console.log("Rodando na porta 3000.")
})

//Criação de rota
app.get("/atendimentos", (req, resp) => {
    resp.send("Você está na rota de atendimentos.")
})