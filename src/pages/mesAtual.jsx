import '../styles/mesAtual.css';
import { gerarListaMes , gerarTitulo} from '../helpers/handlerDias';
import { useRef, useState } from 'react';

function MesAtual() {
    const [dias, setDias] = useState(gerarListaMes() || []) 
    const [total, setTotal] = useState(0)
    const titulo = useRef(gerarTitulo())
    
    function toggle(id, isMarcado) {
        setDias(prev => prev.map((item) => item.id === id ? {... item, marcado: !item.marcado} : item))
        setTotal(prev => isMarcado ? prev - 30 : prev + 30);
    }

    const listaUl = <ul className='checklist clean'>
        {dias.map((dia) => 
        <li key={dia.id} className={dias.length === (dias.indexOf(dia))+1 ? "check" : "check border-bottom"} >
        <input 
            type="checkbox" 
            id={dia.id}
            checked={dia.marcado}
            onChange={() => toggle(dia.id, dia.marcado)}
            />
        <label htmlFor={dia.id}>{dia.dataFormatada}</label>
        <small className={dia.marcado ? "ok" : "badge"}>{dia.marcado ? "Ok" : "Pendendte"}</small>
    </li>)}
    </ul> 

    return(
        <>
            <div className='conteudo'>
                <div className='box-dias'>
                    <h1>{titulo.current}</h1>
                    {listaUl}
                </div>
                <div className='total'>
                    <span>Total:</span>
                    <span>R$ {total}</span>
                </div>
            </div>
        </>
    )
}

export default MesAtual;