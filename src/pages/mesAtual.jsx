import '../styles/mesAtual.css';
import { gerarObjetoMesAtual, gerarTitulo, isObjetoAtual} from '../helpers/handlerDias';
import { useEffect, useRef, useState } from 'react';
import { formatarDinheiro } from '../helpers/handlerCurrency';
import Modal from '../components/modal';

function MesAtual() {
    const [objetoMesAtual, setObjetoMesAtual] = useState(() => {
        const objeto = localStorage.getItem('objMesAtual');
        if(objeto) {
            const objFormat = JSON.parse(objeto);
            return isObjetoAtual(objFormat) ? objFormat : gerarObjetoMesAtual();
        }
        return gerarObjetoMesAtual();
    }) 
    const [botOpenModal, setBotOpenModal] = useState(false)
    const titulo = gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano);

    const totalMarcado = objetoMesAtual.arrayDias.reduce((acc, dia) => {
        return acc + (dia.marcado ? 1 : 0);
    }, 0)

    const valorTotal = totalMarcado * 30

    const isAllMarked = totalMarcado === objetoMesAtual.arrayDias.length;

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
                {isAllMarked ? <span onClick={() => {setBotOpenModal(true)}} className="material-symbols-outlined info-icon">
                    check
                </span> : null}
                
                <div className='box-dias'>
                    <h1>{titulo}</h1>
                    {listaUl}
                </div>
                <div className='total'>
                    <span>Total:</span>
                    <span>{formatarDinheiro(valorTotal)}</span>
                </div>
            </div>
            <Modal isOpen={botOpenModal} onFecharModal={() => {setBotOpenModal(!botOpenModal)}} />
        </>
    )
}

export default MesAtual;