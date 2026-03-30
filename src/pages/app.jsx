import { useEffect, useState } from "react";
import MesAtual from "./mesAtual";
import Meses from "./meses";
import Modal from "../components/modal";
import '../styles/global.css';

const NAV_KEY = 'nave-page';
const LATEST_VERSION = 'v1.4.1';

const STYLES_HOME = {
    
    footerStyle: {
        position: "fixed",
        zIndex: "300",
        top: "85%",
        bottom: "0",
        width: "100%",
        left: "0",
        right: "0",
        display: "flex",
        backdropFilter: 'blur(5px)',
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
    },
    textVersion: {
        color: "#b5b5b5f2",
        width: "90%",
        textAlign: "right",
        paddingTop: "10px"
    }
}

function setarUserVersionLocalStorage(valor) {
    localStorage.setItem('USER_VERSION', valor);
}

function handlerVersion(setAtualizacao, setUserVersion) {
    //pegar valor versao user local storage
    const userVersion = localStorage.getItem('USER_VERSION')

    if(userVersion) {
        if(userVersion !== LATEST_VERSION) {
            //setar atualizacao para true
            setAtualizacao(true);
        }
    }
    else {
        setarUserVersionLocalStorage(LATEST_VERSION);
        setUserVersion(LATEST_VERSION);
    }       

}

function App() {
    const [atualizacao, setAtualizacao] = useState(false);
    const [userVersion, setUserVersion] = useState("");
    
    useEffect(() => {
        handlerVersion(setAtualizacao, setUserVersion);
    },[])

    const [botaoNavegacao, setBotaoNavegacao] = useState(() => {
        return sessionStorage.getItem(NAV_KEY) ?? "atual"
    });
    const isAtual = botaoNavegacao === "atual";


    useEffect(() => {
        sessionStorage.setItem(NAV_KEY, botaoNavegacao)
    }, [botaoNavegacao])

    function atualizar() {
        console.log("Atualizei");
        //pegar objMes localStorage
        //para cada mes gerar um arrayMes
        setarUserVersionLocalStorage(LATEST_VERSION);
        setUserVersion(LATEST_VERSION);
        setAtualizacao(false);
    }

    return (
        <>
            {isAtual ? <MesAtual /> : <Meses />}
            {atualizacao ? 
                <Modal isOpen={true}>
                    <div className='janela-modal janela-modal-para-fechar-mes'>
                        <div className="text">
                            <h2>Uma atualização importante está disponível !</h2>
                            <p>A atualização é crucial para manter o funcionamento correto do app.</p>
                        </div>
                        <div className="option-atualizar">
                            <button onClick={atualizar} className="bot-modal">
                                Atualizar
                            </button>
                        </div>
                    </div>
                </Modal>
                :
                null
            }
            <footer style={STYLES_HOME.footerStyle}>
                <button style={STYLES_HOME.botNavegacao} onClick={() => setBotaoNavegacao(prev => (prev === "atual" ? "meses" : "atual"))}>{isAtual ? "Meses" : "Mes atual"} ⇆</button> 
                <span style={STYLES_HOME.textVersion}>{userVersion}</span>
            </footer>
        </>
    )
}

export default App;