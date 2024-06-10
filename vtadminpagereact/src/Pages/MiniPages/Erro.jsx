import React from "react";
import TopMenu from "../../Componentes/MenuTop";
import NavMenu from "../../Componentes/nav";
import backgroundImage from '../../public/Erro-bg.png'; // Importe a imagem
import { Corpo } from "../Corpo";

export function ErroBG(props) {
    return (
        <div style={{
            position: 'relative',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centraliza o conteúdo verticalmente
            justifyContent: 'center' // Centraliza o conteúdo horizontalmente
        }}>

            
            <div>
                <h1 style={{color:"white"}}>Página não encontrada</h1>
            </div>

        </div >
    )
}