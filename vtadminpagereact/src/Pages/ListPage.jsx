import React, { useEffect, useState } from "react";
import NavMenu from "../Componentes/nav";
import ListaItens from "../Componentes/Lista";
import Button from 'react-bootstrap/Button';
import { CheckAuteticacao } from "../Funçoes/auntenticar";
import ErroPage from "./Erro";
import { LinkContainer } from "react-router-bootstrap";
import { Animal } from "../Componentes/Form.jsx";



export default function Lista() {

    let middleScreen = { margin: "02% 17%", border: '1px solid black' }
    const [userTipo, setUserTipo] = useState("")
    const loggedRight = CheckAuteticacao()
    console.log(loggedRight)

    useEffect(() => {
        switch (loggedRight.Conta) {
            case "cliente":
                setUserTipo("Pacientes")
        }

    }, [])


    if (loggedRight) {
        return (
            <>
                <NavMenu position={""} margin={"-05%"} tipo={'lCA'} /><br /><br />

                {loggedRight.Conta === "funcionario" ?
                    <>
                        <div>
                            <Button onClick={() => { setUserTipo("Clientes") }} variant="outline-dark">Cliente</Button>
                            <Button onClick={() => { setUserTipo("Funcionarios") }} variant="outline-dark">Funcionario</Button>
                        </div>
                    </> : null
                }
                {userTipo === "Pacientes" ?
                    <>
                        <h4>Adicionar Animal</h4>
                        {/*alterar aqui para enviar state junto para evitar criar aquilo la em animal*/}
                        <LinkContainer to={"/Animal"}>
                            <Button variant="outline-dark">Adicionar</Button>
                        </LinkContainer>
                    </>
                    : null}
                <div style={middleScreen}>
                    <ListaItens user={userTipo} cpf={loggedRight.cpf} />
                </div>
            </>
        )
    } else {
        return (
            <ErroPage />
        )
    }
}