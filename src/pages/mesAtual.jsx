import '../styles/mesAtual.css';
import { gerarObjetoMesAtual, gerarTitulo, isObjetoAtual, gerarDataAtualTitulo} from '../helpers/handlerDias';
import { useEffect, useState } from 'react';
import { formatarDinheiro } from '../helpers/handlerCurrency';
import Modal from '../components/modal';
import { gerarIdKey } from '../helpers/handlerId';

function MesAtual() {
    const [objetoMesAtual, setObjetoMesAtual] = useState(() => {
        const objeto = localStorage.getItem('objMesAtual');
        if(objeto) {
            return JSON.parse(objeto);
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

    function fecharMes() {
        const obj = localStorage.getItem('objMes')
        if(obj) {
            const objFormat = JSON.parse(obj)
            //logica para o objeto que acabei de pegar e adicionar mais um que é o mes atual
        }
        localStorage.setItem('objMes', JSON.stringify({}))
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

    const diaAtualTitulo = gerarDataAtualTitulo()

    return(
        <>
            <div className='conteudo'>
                <div className={isAllMarked ? 'set-borda' : null}>
                    <div className='titulo'>
                        <h1>{titulo}</h1>
                        <p className='data-titulo'>{diaAtualTitulo}</p>
                    </div>
                    {listaUl}
                </div>
                <div className={isAllMarked ? 'pai-total' : null}>
                    <div className={isAllMarked ? 'total-no-margin' : 'total'}>
                        <span>Total:</span>
                        <span>{formatarDinheiro(valorTotal)}</span>
                    </div>
                    { isAllMarked ? <div className='caixa-check'>
                    <span onClick={() => {setBotOpenModal(true)}}               className="material-symbols-outlined info-icon">check</span>
                    </div> : null}
                </div>
            </div>
            <Modal isOpen={botOpenModal} onFecharModal={() => {setBotOpenModal(!botOpenModal)}} onFecharMes={fecharMes} />
        </>
    )
}

export default MesAtual;