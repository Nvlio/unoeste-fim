import React from "react";
import TopMenu from "../../Componentes/MenuTop";
import NavMenu from "../../Componentes/nav";

export function MenusPage(props) {
    return (
        <>
            <div style={{ marginTop: "-1000000px", position: "fixed" }}>
                <TopMenu />
                <NavMenu position={"fixed"} margin={""} />
            </div>
        </>
    )
}