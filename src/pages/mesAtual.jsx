import '../styles/mesAtual.css';
import { gerarObjetoMesAtual, gerarTitulo, isObjetoAtual} from '../helpers/handlerDias';
import { useEffect, useRef, useState } from 'react';
import { formatarDinheiro } from '../helpers/handlerCurrency';

function MesAtual() {
    const [objetoMesAtual, setObjetoMesAtual] = useState(() => {
        const objeto = localStorage.getItem('objMesAtual');
        if(objeto) {
            const objFormat = JSON.parse(objeto);
            return isObjetoAtual(objFormat) ? objFormat : gerarObjetoMesAtual();
        }
        return gerarObjetoMesAtual();
    }) 
    const [total, setTotal] = useState(objetoMesAtual.valorTotal)
    const titulo = useRef(gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano));

    useEffect(() => {
        try {
            localStorage.setItem('objMesAtual', JSON.stringify(objetoMesAtual));
        } catch (e) {
            console.log(`Erro ao salvar no localStorage => ${e}`)
        }
    },[objetoMesAtual])
    
    function toggle(id, isMarcado) {
        setObjetoMesAtual(prev => ({...prev, 
            arrayDias: prev.arrayDias.map((item) => item.id === id ? {...item, marcado: !item.marcado} : item)}));
        const valorAtual = objetoMesAtual.arrayDias.find((dia) => dia.id === id);
        setTotal(prev => isMarcado ? prev - valorAtual.valor : prev + valorAtual.valor);
    }

    const listaUl = <ul className='checklist clean'>
        {objetoMesAtual.arrayDias.map((dia) => 
        <li 
            key={dia.id} 
            className={objetoMesAtual.arrayDias.length === (objetoMesAtual.arrayDias.indexOf(dia))+1 ? "check" : "check border-bottom"} 
        >
        <input 
            type="checkbox" 
            id={dia.id}
            checked={dia.marcado}
            onChange={() => toggle(dia.id, dia.marcado)}
            />
        <label 
            className={dia.marcado ? 'marcado' : undefined}
            htmlFor={dia.id}
            >
            {dia.dataFormatada}
        </label>
        <small 
            className={dia.marcado ? "ok" : "badge"}>
                {dia.marcado ? "Ok" : "Pendendte"}
        </small>
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
                    <span>{formatarDinheiro(total)}</span>
                </div>
            </div>
        </>
    )
}

export default MesAtual;