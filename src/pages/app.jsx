import { useState } from "react";
import MesAtual from "./mesAtual";
import Meses from "./meses";
import '../styles/global.css';

function App() {
    const [botaoNavegacao, setBotaoNavegacao] = useState('atual');
    const isAtual = botaoNavegacao === 'atual';
    return (
        <>
            {isAtual ? <MesAtual /> : <Meses />}
            <nav>
                <button className="meses" onClick={() => setBotaoNavegacao(prev => (prev === 'atual' ? 'meses' : 'atual'))}>{isAtual ? "Meses" : "Atual"} ⇆</button> 
            </nav>
        </>
    )
}

export default App;