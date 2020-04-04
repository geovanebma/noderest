const custonExpress = require("./config/custonExpress.js")
const conexao = require("./infraestrutura/conexao")
const Tabelas = require("./infraestrutura/tabelas")
//Conferindo a conexão com o banco de dados
conexao.connect((erro) => {
    if(erro){
        console.log(erro)
    }else{
        //Se estiver conectado com sucesso, ai sim roda o servidor
        console.log("Conectando com sucesso.")
        Tabelas.init(conexao)
        const app = custonExpress()

        app.listen(3000, function(){
            console.log("Rodando na porta 3000.")
        })
    }
})