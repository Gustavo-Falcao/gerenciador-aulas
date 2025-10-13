import '../styles/mesAtual.css';
import { gerarListaMes , gerarTitulo} from '../helpers/handlerDias';
import { useRef, useState } from 'react';

function MesAtual() {
    const [dias, setDias] = useState(gerarListaMes() || []) 
    const total = useRef(0)
    function toggle(id) {
        setDias(prev => prev.map((item) => item.id === id ? {... item, marcado: !item.marcado} : item))
    }
    const listaUl = <ul className='checklist clean'>
        {dias.map((dia) => 
        <li key={dia.id} className={dias.length === (dias.indexOf(dia))+1 ? "check" : "check border-bottom"} >
        <input 
            type="checkbox" 
            id={dia.id}
            checked={dia.marcado}
            onChange={() => toggle(dia.id)}
            />
        <label htmlFor={dia.id}>{dia.dataFormatada}</label>
        <small className='badge'>{dia.marcado ? "Ok" : "Pendendte"}</small>
    </li>)}
    </ul> 
    const titulo = gerarTitulo();

    return(
        <>
            <div className='conteudo'>
                <div className='box-dias'>
                    <h1>{titulo}</h1>
                    {listaUl}
                </div>
                <div className='total'>
                    <span>Total:</span>
                    <span>R$ 270,00</span>
                </div>
            </div>
            
        </>
    )
}

export default MesAtual;