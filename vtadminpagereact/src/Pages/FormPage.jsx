import React, { useState } from "react";
import { Login, Cadastro, Animal } from "../Componentes/Form";
import NavMenu from "../Componentes/nav";
import { LinkContainer } from "react-router-bootstrap";

import Button from 'react-bootstrap/Button';
import { useLocation, useParams } from "react-router-dom";


export default function Formulario(props) {
    const location = useLocation()
    let userInfo = null;

    if (location.state != null) {
        userInfo = { userInfo } = location.state
    }

    console.log(userInfo)
    const [tipo, setTipo] = useState("login")
    const [user, setUser] = useState(["Clientes", "Funcionarios"])

    let formSty = { border: '1px solid black', borderRadius: '10px', margin: " 10% 20%", padding: "04%" }

    if (location.state === null) {
        return (

            <div>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} />
                <div style={{ paddingBottom: "1px" }} />
                <div style={formSty}>

                    {tipo === "login" && userInfo === null ?
                        <div>
                            <h1>Login de {user[0]}</h1><br />
                            <Login user={user[0]} />

                        </div> :
                        <div>
                            <h1>Cadastro de {user[0]}</h1><br />
                            <Cadastro user={user[0]} func={userInfo} />
                        </div>}
                    <p>Não tem conta? <strong
                        onMouseOver={(e) => { e.target.style.cursor = 'pointer'; e.target.style.color = "blue" }}
                        onMouseOut={(e) => { e.target.style.cursor = "default"; e.target.style.color = "black" }}
                        onClick={() => { setTipo("cadastro"); }}>Cadastre-se</strong></p>

                    <p>É um {user[1]}? <strong
                        onMouseOver={(e) => { e.target.style.cursor = 'pointer'; e.target.style.color = "blue" }}
                        onMouseOut={(e) => { e.target.style.cursor = "default"; e.target.style.color = "black" }}
                        onClick={() => { setTipo("login"); setUser([user[1], user[0]]) }}>Entre</strong></p>
                </div>
                
            </div>
        )
    } else {
        return (

            <div>
                <NavMenu position={""} margin={"-07%"} />
                <div style={{ paddingBottom: "1px" }} />
                <div style={formSty}>


                    <div>

                        <h1>Atualizar {userInfo.tipo}</h1>
                        <br />
                        {userInfo.tipo==='Pacientes'?
                        <Animal user={user[0]} func={userInfo}/>
                        :<Cadastro user={user[0]} func={userInfo} />}
                    </div>

                </div>
                <LinkContainer to={"/List"} style={{ marginLeft: "50%" }}><Button variant="primary">
                    Voltar
                </Button></LinkContainer>
            </div>
        )
    }

}


/*
                {tipo==="login"?<h1>login</h1>:<h1>Cadastro</h1>}
                {tipo==="login"?<p onClick={()=>{setTipo('cadastro')}}>Cadastro</p>:<p onClick={()=>{setTipo('login')}}>Login</p>}

*/