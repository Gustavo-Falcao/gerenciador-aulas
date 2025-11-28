import { useEffect, useState } from "react";
import MesAtual from "./mesAtual";
import Meses from "./meses";
import '../styles/global.css';

const NAV_KEY = 'nave-page';

const STYLES_HOME = {
    
    footerStyle: {
        position: "absolute",
        zIndex: "300",
        top: "85%",
        bottom: "0",
        width: "100%",
        left: "0",
        right: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    botNavegacao: {
        padding: ".75rem 1rem",
        borderRadius: "14px",
        fontWeight: "600",
        fontSize: "1.4em",
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        borderStyle: "none",
        width: "320px",
        backgroundColor: "#22c55e",
        color: "white",
        letterSpacing: ".2px"
    }
}

function App() {
    const [botaoNavegacao, setBotaoNavegacao] = useState(() => {
        return sessionStorage.getItem(NAV_KEY) ?? "atual"
    });
    const isAtual = botaoNavegacao === "atual";
    
    useEffect(() => {
        sessionStorage.setItem(NAV_KEY, botaoNavegacao)
    }, [botaoNavegacao])

    return (
        <>
            {isAtual ? <MesAtual /> : <Meses />}
            <footer style={STYLES_HOME.footerStyle}>
                <button style={STYLES_HOME.botNavegacao} onClick={() => setBotaoNavegacao(prev => (prev === "atual" ? "meses" : "atual"))}>{isAtual ? "Meses" : "Mes atual"} ⇆</button> 
            </footer>
        </>
    )
}

export default App;