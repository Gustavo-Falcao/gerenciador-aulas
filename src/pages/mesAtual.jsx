import '../styles/mesAtual.css';
import { gerarObjetoMesAtual, gerarTitulo, gerarDataAtualTitulo, gerarObjetoProximoMes} from '../helpers/handlerDias';
import { useEffect, useRef, useState } from 'react';
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
    console.log(objetoMesAtual)
    const [botOpenModal, setBotOpenModal] = useState(false)
    const [botCheckAnimation, setbotCheckAnimation] = useState(false)
    const [totalToLeft, setTotalToLeft] = useState(false)
    const [showAnimationCaixaCheck, setshowAnimationCaixaCheck] = useState(false)
    const [valorTotal, setValorTotal] = useState(0);
    const titulo = gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano);
    const totalMarcado = useRef(0);

    console.log(`Estado do botao para aparecer o check =>> ${showAnimationCaixaCheck}`)
    console.log(`Estado do total no left =>> ${totalToLeft}`)
    console.log(`Total marcado =>>> ${totalMarcado.current}`)

    useEffect(() => {
        try {
            localStorage.setItem('objMesAtual', JSON.stringify(objetoMesAtual));
        } catch (e) {
            console.log(`Erro ao salvar no localStorage => ${e}`)
        }

        totalMarcado.current = objetoMesAtual.arrayDias.reduce((acc, dia) => {
        return acc + (dia.marcado ? 1 : 0);
        }, 0)

        setValorTotal(totalMarcado.current * 30)

        if(totalMarcado.current === objetoMesAtual.arrayDias.length && !totalToLeft && !showAnimationCaixaCheck) {
            setTotalToLeft(true)
            setTimeout(() => {
                setshowAnimationCaixaCheck(true)
            }, 1000)
        }else {
            if(totalToLeft && showAnimationCaixaCheck) {
                setTimeout(() => {
                    setTotalToLeft(false)
                }, 1000)
                setshowAnimationCaixaCheck(false)
            }
        }
    },[objetoMesAtual])
    
    function toggle(id) {
        setObjetoMesAtual(prev => ({...prev, arrayDias: prev.arrayDias.map((item) => item.id === id ? {...item, marcado: !item.marcado} : item)}));
    }

    function toggleModal() {
        if(!botOpenModal) {
            setTimeout(() => {
                setBotOpenModal((prev) => !prev)
            }, 800)
            setbotCheckAnimation((prev) => !prev) 
        } else {
            setbotCheckAnimation((prev) => !prev) 
            setBotOpenModal((prev) => !prev)
        }
    }

    function fecharMes() {
        const objMesAtual = {id: gerarIdKey(), arrayDias: objetoMesAtual.arrayDias, ano: objetoMesAtual.ano, mes: objetoMesAtual.mes, quantAula: totalMarcado.current, valorTotal: valorTotal};
        const mesAtual = objetoMesAtual.mes;
        const anoAtual = objetoMesAtual.ano;
        const obj = localStorage.getItem('objMes')
        if(obj) {
            console.log('O OBJETO É VERDADEIRO, VAI MODIFICAR O QUE EXISTE')
            const objFormat = JSON.parse(obj)
            console.log(objFormat)
            console.log('Novo objeto mes modificado|||||||||||||||||||')
            const newObj = [...objFormat, objMesAtual]
            localStorage.setItem('objMes', JSON.stringify(newObj))
        } else {
            console.log('O OBJETO É FALSO, VAI CRIAR UM NOVO ARRAY MESES')
            localStorage.setItem('objMes', JSON.stringify([objMesAtual]))
        }
        localStorage.setItem('objMesAtual', JSON.stringify(gerarObjetoProximoMes(mesAtual, anoAtual)))
        toggleModal()
        setObjetoMesAtual(JSON.parse(localStorage.getItem('objMesAtual')))
    }

    const listaUl = <ul className={objetoMesAtual.arrayDias.length > 8 ? 'checklist set-rolagem' : 'checklist'}>
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
                <div className={totalToLeft ? 'set-borda calendar' : 'calendar'}>
                    <div className='titulo'>
                        <h1>{titulo}</h1>
                        <p className='data-titulo'>{diaAtualTitulo}</p>
                    </div>
                    {listaUl}
                </div>
                <div className={totalToLeft ? 'total total-to-left' : 'total'}>
                    <span>Total:</span>
                    <span>{formatarDinheiro(valorTotal)}</span>
                </div>
                <div className= {showAnimationCaixaCheck ? 'pai-caixa-check pai-caixa-check-show' : 'pai-caixa-check'} >
                    <div className={`caixa-check ${botCheckAnimation ? 'active' : 'inactive'}`}onClick={toggleModal}>
                <span className="material-symbols-outlined info-icon">check</span>
                </div>
                </div>
                
                
            </div>
            <Modal isOpen={botOpenModal}>
                <div className='janela-modal'>
                    <div className="text">
                        <h2>Deseja fechar esse mês ?</h2>
                        <p>Ao fechar o mês, será gerado uma nova lista com as aulas do mês seguinte.</p>
                    </div>
                    <div className="options">
                        <button onClick={toggleModal} className="bot-modal">Cancel</button>
                        <button onClick={fecharMes} className="bot-modal fechar">Fechar</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MesAtual;