const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    //Inserir no BD
    adiciona(atendimento, resp) {
        //Moment é exclusivo para formatar as datas a desejar
        const datacri = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataEhValida = moment(data).isSameOrAfter(datacri)
        const clienteEhValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual que a data atual."
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagem: "Cliente deve conter ao menos 5 caracteres."
            }
        ]

        //Serve para tratar corretamente e mostrar o erro ao cliente com as validações certas
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
        
        if(erros){
            resp.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, datacri, data}

            const sql = 'INSERT INTO Atendimentos SET ?'
        
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    //.status - informa qual tipo de código http quer que apareça caso de determinada situação, tipo, quando é enviado com sucesso é status 200, quando dá erro é 400
                    resp.status(400).json(erro)
                } else {
                    //.json - mostra a resposta em json 
                    resp.status(201).json(atendimento)
                }
            })
        }
    }

    //Lista todas as informações que tem no BD
    lista(resp){
        const sql = "SELECT * FROM Atendimentos"

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                resp.status(400).json(erro)
            }else{
                resp.status(200).json(resultados)
            }
        })
    }

    //Essencial para buscar um único id
    buscaPorId(id, resp){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                resp.status(400).json(erro)
            }else{
                resp.status(200).json(atendimento)
            }
        })
    }

    //Alterar no BD
    altera(id, valores, resp){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = "UPDATE atendimentos SET ? WHERE id=?"

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                resp.status(400).json(erro)
            }else{
                resp.status(200).json(...valores, id)
            }
        })
    }

    //Deletar pelo id
    deleta(id, resp){
        sql = `DELETE FROM atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                resp.status(400).json(erro)
            }else{
                resp.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento