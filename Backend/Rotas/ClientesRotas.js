import router from 'express'
import ClienteControle from '../Controle/ClienteControle.js'

//cria objeto de rotas e de controle
const ClienteRota = new router()
const CtrCLi = new ClienteControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
ClienteRota
.get('/',CtrCLi.GET)
.post('/',CtrCLi.POST)
.post('/:tipo',CtrCLi.LOGIN)
.get('/:nome',CtrCLi.GETVal)
.put('/:cpf',CtrCLi.PUT)
.delete('/:cpf',CtrCLi.DELETE)

export default ClienteRota