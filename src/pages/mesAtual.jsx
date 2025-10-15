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
    const titulo = gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano);

    const valorTotal = objetoMesAtual.arrayDias.reduce((acc, dia) => {
        return acc + (dia.marcado ? 30 : 0);
    }, 0)

    useEffect(() => {
        try {
            localStorage.setItem('objMesAtual', JSON.stringify(objetoMesAtual));
        } catch (e) {
            console.log(`Erro ao salvar no localStorage => ${e}`)
        }
    },[objetoMesAtual])
    
    function toggle(id) {
        setObjetoMesAtual(prev => ({...prev, arrayDias: prev.arrayDias.map((item) => item.id === id ? {...item, marcado: !item.marcado} : item)}));
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
            onChange={() => toggle(dia.id)}
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
                    <h1>{titulo}</h1>
                    {listaUl}
                </div>
                <div className='total'>
                    <span>Total:</span>
                    <span>{formatarDinheiro(valorTotal)}</span>
                </div>
            </div>
        </>
    )
}

export default MesAtual;