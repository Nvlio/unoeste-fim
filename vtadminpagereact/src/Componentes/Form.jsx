import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { cpfValidator } from 'cpf-validator-ianan';
import { Autenticar, CheckAuteticacao } from '../Funçoes/auntenticar';
import NavMenu from './nav';


//componente Responsavel apenas por login
export function Login(props) {

    const [userData, setUserData] = useState({ senha: "", email: "" })
    const warnRef = useRef(null)

    //mask que verifica se email esta correto
    function Mask(e, tipo) {
        let regex;
        let value = e.target.value
        let resultado;

        if (e.key === "Enter" || e.key === undefined) {
            switch (tipo) {
                case "Email":
                    regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/
                    resultado = regex.test(value)
                    if (resultado === false) {
                        setUserData((prevState) => ({ ...prevState, email: "" }))
                    }
                    break
                default:
                    break
            }
            if (resultado === false) {
                e.target.style.color = "red"
                e.target.value = `O campo ${tipo} esta errado`

            }
        }
    }

    //funcao que emite um aviso ao usuário
    function Warning() {
        warnRef.current.focus()
        warnRef.current.innerText = "Conta não existe"
        warnRef.current.style.background = "red"
        warnRef.current.style.color = "white"
    }

    //função que envia dados para o servidor e verifica se há logins
    async function EnviarData(id = "", tipo = "") {

        if ((userData.email === "" || userData.senha === "")) {
            alert("ainda há campos sem os dados")
        }
        else {
            fetch('http://localhost:3002/' + props.user + "/Login", {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    senha: userData.senha,
                    email: userData.email
                })
            }).then((resp) => {
                return resp.json()
            }).then((resposta) => {
                console.log(resposta.conta)
                if (resposta.resp === true) {
                    Autenticar(resposta.token)
                    window.location.href = "/"
                } else {
                    Warning()
                }
            })
        }
    }


    return (
        <>
            <div ref={warnRef} />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, email: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, 'Email') }}
                        onMouseOut={(e) => { Mask(e, 'Email') }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {props.user === "Usuário" ? <Form.Label>Senha</Form.Label> : <Form.Label>Código</Form.Label>}
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setUserData((prevState) => ({ ...prevState, senha: e.target.value })) }} />
                </Form.Group>
                <Button variant="primary" onClick={() => { EnviarData() }}>
                    Entrar
                </Button>
            </Form>
        </>
    );
}

//componente responsavel por cadastro|Atualizar
export function Cadastro(props) {
    const especialidade = ["cirurgia", "marketing", "veterinário", "clínico"]
    const [userData, setUserData] = useState({ nome: "", email: "", senha: "", confirm: false, tel: "", cpf: "", unidade: "", especialidade: especialidade[0], funcao: "" })
    const divStyle = { border: '1px solid gray', borderRadius: '10px', padding: '10px', margin: '10px' }

    function Mask(e, tipo) {
        let regex;
        let value = e.target.value
        let resultado;

        if (e.key === "Enter" || e.key === undefined) {
            switch (tipo) {
                case "Email":
                    regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)\.(com)$/
                    resultado = regex.test(value)
                    break
                case "CPF":
                    if (cpfValidator(value)) {
                        setUserData((prevState) => ({ ...prevState, cpf: value }))


                    } else {
                        resultado = false
                    }
                    break
                case "Telefone":
                    regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
                    resultado = regex.test(value)

                    if (e.target.value.length === 11) {
                        let numRegx = regex.exec(value)
                        let numero = `(${numRegx[1]}) ${numRegx[2]}-${numRegx[3]}`
                        e.target.value = numero
                        setUserData((prevState) => ({ ...prevState, tel: numero }))
                    }
                    else if (/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
                        resultado = true
                    }
                    break
                default:
                    break
            }
            if (resultado === false) {
                e.target.style.color = "red"
                e.target.value = `O campo ${tipo} esta errado`

            }

        }

    }

    function Reset(e, tipo) {
        if (e.target.value === `O campo ${tipo} esta errado`) {
            e.target.style.color = "black"
            e.target.value = ""
        }
    }

    async function EnviarData(id = "", tipo = "") {
        console.log(userData)
        if (!userData.confirm) {
            alert('confime senha')
        } else if ((userData.nome === "" || userData.email === "" || userData.tel === "" || userData.cpf === "")) {
            alert("ainda há campos sem os dados")
        } else if (props.user === "Funcionario" && (userData.funcao === "" || userData.unidade === "" || userData.especialidade === "")) {
            alert("ainda há campos sem os dados")
        }
        else {

            console.log(userData)
            fetch('http://localhost:3002/' + props.user, {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    cpf: userData.cpf,
                    nome: userData.nome,
                    telefone: userData.tel,
                    senha: userData.senha,
                    email: userData.email,
                    especialidade: userData.especialidade,
                    unidade: userData.unidade,
                    funcao: userData.funcao
                })
            }).then((resp) => {
                return resp.json()
            }).then((resposta) => {
                console.log(resposta)
                if (resposta.resp === "work") {
                    Autenticar(resposta.token)
                    window.location.href = "/"
                }
                //mudar essa parte conforme a rafa fizer a parte dela

            })

        }
    }

    async function Atualizar(id = "", tipo = "") {
        console.log(userData)

        let cpf = userData.cpf === "" ? props.func.userInfo["cpf"] : userData.cpf
        let nome = userData.nome === "" ? props.func.userInfo["nome"] : userData.nome
        let tel = userData.tel === "" ? props.func.userInfo["telefone"] : userData.tel
        let senha = userData.senha === "" ? props.func.userInfo["senha"] : userData.senha
        let email = userData.email === "" ? props.func.userInfo["email"] : userData.email
        let especialidade = userData.especialidade === "" ? props.func.userInfo["especialidade"] : userData.especialidade
        let unidade = userData.unidade === "" ? props.func.userInfo["unidade"] : userData.unidade
        let funcao = userData.funcao === "" ? props.func.userInfo["funcao"] : userData.funcao
        console.log(cpf, nome, tel, senha, email, especialidade, unidade, funcao)

        fetch('http://localhost:3002/' + tipo + `/${id}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf: cpf,
                nome: nome,
                telefone: tel,
                senha: senha,
                email: email,
                especialidade: especialidade,
                unidade: unidade,
                funcao: funcao
            })
        }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            console.log(resposta)
        })
    }

    function isSenhaIgual(e) {
        if (e.key === "Enter" || e.key === undefined) {
            if (e.target.value === userData.senha) {
                e.target.style.background = "white"
                setUserData((prevState) => ({ ...prevState, confirm: true }))
            } else {
                setUserData((prevState) => ({ ...prevState, confirm: false }))
                e.target.value === "" && e.target.value === "senha" ? e.target.style.background = "white" : e.target.style.background = "red"
                e.target.value = "";
                e.target.placeholder = "Senha diferente"
            }
        } else {
            e.target.style.background = "white"
            setUserData((prevState) => ({ ...prevState, confirm: false }))
        }
    }


    if (props.func === null) {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Seu nome" onChange={(e) => { setUserData((prevState) => ({ ...prevState, nome: e.target.value })) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Seu email"
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, email: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "Email") }}
                        onClick={(e) => { Reset(e, "Email") }}
                        onMouseOut={(e) => { Mask(e, "Email") }}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu email.
                    </Form.Text>
                </Form.Group>

                <div style={divStyle}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {props.user === "Cliente" ? <Form.Label>Senha</Form.Label> : <Form.Label>Código</Form.Label>}
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setUserData((prevState) => ({ ...prevState, senha: e.target.value })) }} /><br />
                        {props.user === "Cliente" ? <Form.Label>Confirme sua Senha</Form.Label> : <Form.Label>Confirme seu Codigo</Form.Label>}
                        <Form.Control type="password" placeholder="Password"
                            onKeyDown={(e) => { isSenhaIgual(e) }}
                            onMouseOut={(e) => { isSenhaIgual(e) }}
                        />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="telefone" placeholder="(18) 99999-9999" maxLength={11}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, tel: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "Telefone") }}
                        onClick={(e) => { Reset(e, "Telefone") }}
                        onMouseOut={(e) => { Mask(e, "Telefone") }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="CPF" placeholder="coloque seu CPF aqui" maxLength={11}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, cpf: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "CPF") }}
                        onClick={(e) => { Reset(e, "CPF") }}
                        onMouseOut={(e) => { Mask(e, "CPF") }}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu CPF
                    </Form.Text>
                </Form.Group>

                {props.user === "Funcionarios" ? <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Unidade</Form.Label>
                        <Form.Control type="text" placeholder="unidade do profissional" onChange={(e) => { setUserData((prevState) => ({ ...prevState, unidade: e.target.value })) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>especialidade</Form.Label>
                        <Form.Select onChange={(e) => { setUserData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText })) }}>
                            <option value={1}>{especialidade[0]}</option>
                            <option value={2}>{especialidade[1]}</option>
                            <option value={3}>{especialidade[2]}</option>
                            <option value={4}>{especialidade[3]}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>função</Form.Label>
                        <Form.Control type="text" placeholder="função do profisisonal" onChange={(e) => { setUserData((prevState) => ({ ...prevState, funcao: e.target.value })) }} />
                    </Form.Group>
                </div> : null}


                <Button variant="primary" onClick={() => { EnviarData() }}>
                    Cadastrar
                </Button>
            </Form>
        );
    }
    else {
        return (
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="email" placeholder={props.func.userInfo['nome']}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={props.func.userInfo['email']}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, email: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "Email") }}
                        onClick={(e) => { Reset(e, "Email") }}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu email.
                    </Form.Text>
                </Form.Group>

                <div style={divStyle}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {props.user === "Usuário" ? <Form.Label>Senha</Form.Label> : <Form.Label>Código</Form.Label>}
                        <Form.Control type="password" placeholder="Password" onChange={(e) => { setUserData((prevState) => ({ ...prevState, senha: e.target.value })) }} /><br />
                        {props.user === "Usuário" ? <Form.Label>Confirme sua Senha</Form.Label> : <Form.Label>Confirme seu Codigo</Form.Label>}
                        <Form.Control type="password" placeholder="Password" onKeyDown={(e) => { isSenhaIgual(e) }} onChange={(e) => { isSenhaIgual(e) }} />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="telefone" placeholder={props.func.userInfo['telefone']}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, tel: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "Telefone") }}
                        onClick={(e) => { Reset(e, "Telefone") }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="CPF" placeholder={props.func.userInfo['cpf']}
                        onChange={(e) => { setUserData((prevState) => ({ ...prevState, cpf: e.target.value })) }}
                        onKeyDown={(e) => { Mask(e, "CPF") }}
                        onClick={(e) => { Reset(e, "CPF") }}
                    />
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu CPF
                    </Form.Text>
                </Form.Group>
                {props.func.tipo === "Funcionarios" ?
                    <div>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Unidade</Form.Label>
                            <Form.Control type="text" placeholder="unidade do profissional" onChange={(e) => { setUserData((prevState) => ({ ...prevState, unidade: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>especialidade</Form.Label>
                            <Form.Select onChange={(e) => { setUserData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText })) }}>
                                <option value={1}>{especialidade[0]}</option>
                                <option value={2}>{especialidade[1]}</option>
                                <option value={3}>{especialidade[2]}</option>
                                <option value={4}>{especialidade[3]}</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>função</Form.Label>
                            <Form.Control type="text" placeholder="função do profisisonal" onChange={(e) => { setUserData((prevState) => ({ ...prevState, funcao: e.target.value })) }} />
                        </Form.Group>
                    </div>
                    : null}


                <Button variant="primary" onClick={() => { Atualizar(props.func.userInfo["cpf"], props.func.tipo) }}>
                    Atualizar
                </Button>
            </Form>
        );
    }
}

export function Animal(props) {
    const [animalData, setAnimalData] = useState({ nome: "", sexo: "Masculino", raca: "", especie: "" })
    const divStyle = { border: '1px solid gray', borderRadius: '10px', padding: '10px', margin: '10px' }
    const auth = CheckAuteticacao()

    async function EnviarData(id = "", tipo = "") {
        console.log(animalData)
        if ((animalData.nome === "" || animalData.raca === "" || animalData.especie === "")) {
            alert("ainda há campos sem os dados")
        }
        else {

            fetch('http://localhost:3002/Pacientes', {
                method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({
                    cpf:auth.cpf,
                    nome: animalData.nome,
                    sexo: animalData.sexo,
                    raca: animalData.raca,
                    especie: animalData.especie
                })
            }).then((resp) => {
                return resp.json()
            }).then((resposta) => {
                console.log(resposta)
                if (resposta.resp === "work") {
                    window.location.href = "/List"
                }
                //mudar essa parte conforme a rafa fizer a parte dela
            }
            )

        }
    }

    async function AtualizarData(id = "", tipo = ""){
        fetch(`http://localhost:3002/Pacientes/${props.func.userInfo['id']}`, {
            method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({
                cpf:auth.cpf,
                nome: animalData.nome,
                sexo: animalData.sexo,
                raca: animalData.raca,
                especie: animalData.especie
            })
        }).then((resp) => {
            return resp.json()
        }).then((resposta) => {
            console.log(resposta)
            if (resposta.resp === "work") {
                window.location.href = "/List"
            }
            //mudar essa parte conforme a rafa fizer a parte dela
        }
        )
    }


    if(props.func===null){
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <h1>Adicionar Pet</h1>
                <div style={{ border: "1px solid black", borderRadius: "10px", margin: "2% 12%", padding: "2%" }}>
                    <Form>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>especie</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especie: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Raça</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, raca: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>especialidade</Form.Label>
                            <Form.Select onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText })) }}>
                                <option value={0}>{"Masculino"}</option>
                                <option value={1}>{"Feminino"}</option>
                            </Form.Select>
                        </Form.Group>
    
                        <Button variant="primary" onClick={() => { EnviarData() }}>
                            Adicionar
                        </Button>
    
                    </Form>
                </div>
            </>
        );
    }else{
        return (
            <>
                    <Form>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder={props.func.userInfo['nome']}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, nome: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>especie</Form.Label>
                            <Form.Control type="text" placeholder={props.func.userInfo['especie']}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especie: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Raça</Form.Label>
                            <Form.Control type="text" placeholder={props.func.userInfo['raca']}
                                onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, raca: e.target.value })) }}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>especialidade</Form.Label>
                            <Form.Select onChange={(e) => { setAnimalData((prevState) => ({ ...prevState, especialidade: e.target.options[e.target.selectedIndex].innerText })) }}>
                                <option value={0}>{"Masculino"}</option>
                                <option value={1}>{"Feminino"}</option>
                            </Form.Select>
                        </Form.Group>
    
                        <Button variant="primary" onClick={() => { AtualizarData() }}>
                            Atualizar
                        </Button>
    
                    </Form>
                
            </>
        );
    }
}
