
import React, { useEffect, useState } from "react";
import NavMenu from "../Componentes/nav";
import ListaItens from "../Componentes/Lista";
import Button from 'react-bootstrap/Button';
import { ErroBG } from "./MiniPages/Erro";


export default function ErroPage() {
    return (
        <>
            <div style={{ position: "fixed", zIndex:'1' }}>
                <NavMenu position={"fixed"} margin={""} />
            </div>
            <div>
            <ErroBG />
            </div>


        </>
    )
}