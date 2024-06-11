import Conectar from "./Conexao.js";
import PacienteMod from "../Modelo/PacienteModelo.js";

export default class PacienteDB {

    async GET(cpf) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM paciente where id_dono = ?"
            const itens = [cpf]
            const [list] = await conexao.query(sqlCode,itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.id, item.sexo, item.id_dono, item.especie, item.raca,item.nome)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(nome,cpf) {

        try {
            const conexao = await Conectar();
            const sqlCode = "SELECT * FROM `paciente` WHERE nome LIKE ? AND id_dono=?";
            const itens = [`${nome}%`,cpf]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new PacienteMod(item.id, item.sexo, item.id_dono, item.especie, item.raca,item.nome)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(nome, especie, raca,sexo,id_dono) {
        try {
            const conexao = await Conectar();
            const sqlCode = "INSERT INTO paciente (nome,especie,raca,sexo,id_dono) VALUES (?,?,?,?,?)"
            const valores = [nome, especie, raca,sexo,id_dono]
            await conexao.query(sqlCode, valores)

            return ({ "resp": 'work' })
        } catch (e) {
            return ({ "resp": e })
        }
    }

    async PUT(nome, especie, raca,id) {
        try {
            const conexao = await Conectar();
            let conector=""
            let sqlCode = "UPDATE paciente SET" 
            let valores = []
            if (nome!=""){
                sqlCode+=` nome=?`
                valores.push(nome)
                conector=","
            }
            if (especie!=""){
                sqlCode+=`${conector} especie=?`
                valores.push(especie)
                conector=","
            }
            if (raca!=""){
                sqlCode+=`${conector} raca=?`
                valores.push(raca)
            }
            sqlCode+=" WHERE id = ?"
            valores.push(id)
            
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await Conectar();
            const sqlCode = "DELETE FROM paciente WHERE id = ?"
            const valores = [id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}
