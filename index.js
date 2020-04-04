const custonExpress = require("./config/custonExpress.js")

//Toda definição do custonExpress estará sendo trazida aqui passando para a constante app
const app = custonExpress()

//Criação do servidor
app.listen(3000, function(){
    console.log("Rodando na porta 3000.")
})
