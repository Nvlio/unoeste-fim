import Conectar from "./Conexao.js";
import FuncionariMod from "../Modelo/FuncionariosModelo.js";

export default class FuncionarioDB {

    async GET() {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM funcionario"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new FuncionariMod(item.cpf, item.nome, item.telefone, item.senha, item.email,item.especialidade,item.funcao,item.unidade)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(nome,especialidade,funcao,unidade) {

        try {
            const conexao = await Conectar();
            let precisa=" WHERE"
            let sqlCode = "SELECT * FROM `funcionario`";
            let itens=[]
            if (nome!="_"){
                sqlCode+=precisa+" nome LIKE ?";
                precisa=" AND"
                itens.push(`${nome}%`)
            }
            if (especialidade!="_"){
                sqlCode+=precisa+" especialidade LIKE ?";
                precisa=" AND"
                itens.push(`${especialidade}%`)
            }
            if (funcao!="_"){
                sqlCode+=precisa+" funcao LIKE ?",
                precisa=" AND"
                itens.push(`${funcao}%`)
            }
            if (unidade!="_"){
                sqlCode+=precisa+" unidade=?"
                itens.push(unidade)
            }

            const [list] = await conexao.query(sqlCode, itens)
            //unidade não retorna numero
            const listaFim = []

            for (let item of list) {
                const modelo = new FuncionariMod(item.cpf, item.nome, item.telefone, item.senha, item.email,item.especialidade,item.funcao,item.unidade)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async Login(email,senha) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM `funcionario` WHERE email = ? AND senha=?";
            const itens = [email,senha]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            if(list.length>0){
            for (let item of list) {
                const modelo = new FuncionariMod(item.cpf, item.nome, item.telefone, item.senha, item.email,item.especialidade,item.unidade,item.funcao)
                listaFim.push(modelo.ToJSON())
            }
            
            return {resposta:listaFim[0],found:true}
        }else{
                throw new Error('Conta não existe ou dados incorretos')
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async CheckEmailTel(valor) {
        const connect = await Conectar()

        let sqlCode;
        const lista = []
        if (valor.email && valor.telefone) {
            lista.push(valor.email)
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `funcionario` WHERE email = ? AND telefone = ?"
        }else if(valor.email){
            lista.push(valor.email)
            sqlCode = "SELECT * FROM `funcionario` WHERE email = ?"
        }else {
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `funcionario` WHERE telefone =?"
        }
        const [list] = await connect.query(sqlCode, lista)
        if (list.length > 0) {
            return -1
        } else {
            return 0
        }



    }

    async POST(cpf, nome, telefone, senha, email,especialidade,unidade,funcao) {
        try {
            const conexao = await Conectar();
            const Fail = await this.CheckEmailTel({'email':email,'telefone':telefone})
            if(Fail){
                throw new Error("Email ou Telefone ja existem");
            }
            const sqlCode = "INSERT INTO funcionario (cpf, nome, telefone, senha, email,especialidade,unidade,funcao) VALUES (?,?,?,?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email, especialidade, funcao, unidade]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(cpf, nome, telefone, senha, email,especialidade, funcao, unidade) {
        try {
            const conexao = await Conectar();
            const sqlCode = "UPDATE funcionario SET nome=?,telefone=?,senha=?,email=?,especialidade=?,funcao=?,unidade=? WHERE cpf = ?"
            const valores = [nome, telefone, senha, email, especialidade, funcao, unidade,cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(cpf) {
        try {
            const conexao = await Conectar();
            const sqlCode = "DELETE FROM funcionario WHERE cpf = ?"
            const valores = [cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}
