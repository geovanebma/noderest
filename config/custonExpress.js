//Nesta pasta temos todas as configurações de links, imports etc...
//Para facilitar o agrupamento de rotas, utilizaremos o consign
//npm install consign

const express = require("express")
const  consign = require("consign")
const bodyParser = require("body-parser")

module.exports = () => {
    const app = express()

    //O comando use, diz que quer usar determinado método, aqui no caso o body-parser
    //bodyParser.urlencoded() - significa que queremos traduzir do body em formato urlencoded
    //bodyParser.json() - significa que queremos traduzir do body em formato json
    //extended:true - para fazer ele funcionar
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    //Esta parte serve para administrar melhor nossas rotas
    //include("controllers") - qualquer rota adicionada na aba controllers, ele será administrada aqui
    consign()
        .include("controllers")
        .into(app)

    return app
}