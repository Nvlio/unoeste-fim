import cors from "cors"
import express from "express"
import ClienteRota from "./Rotas/ClientesRotas.js"
import FuncionarioRota from "./Rotas/FuncionarioRotas.js"
import PacienteRota from "./Rotas/PacienteRotas.js"

const porta = 3002
const host = "localhost"

const app = express()
app.use(cors())
app.use(express.json())

app.use('/Clientes',ClienteRota)
app.use("/Funcionarios",FuncionarioRota)
app.use("/Pacientes",PacienteRota)

app.listen(porta,host,()=>{console.log(`conectado: www.${host}:${porta}`)})