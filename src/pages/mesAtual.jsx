import '../styles/mesAtual.css';
import { gerarTitulo, gerarDataAtualTitulo, gerarObjetoProximoMes, gerarArrayTodosOsDiasMesAtualAndObjMesAtual, gerarArrayTodosOsDiasMesAtualAndObjMesAtualParaAtualizacao, gerarArrayTodosOsDiasProximoMesEObjetoMesAtualProximoMes} from '../helpers/handlerDias';
import { useEffect, useRef, useState } from 'react';
import { formatarDinheiro } from '../helpers/handlerCurrency';
import Modal from '../components/modal';
import { gerarIdKey } from '../helpers/handlerId';

function MesAtual() {
    const objArrayFullDiasAndObjMesAtual = gerarArrayTodosOsDiasMesAtualAndObjMesAtual();

    const [objetoMesAtual, setObjetoMesAtual] = useState(() => {
        const objeto = localStorage.getItem('objMesAtual');
        if(objeto) {
            return JSON.parse(objeto);
        }
        return objArrayFullDiasAndObjMesAtual.objMesAtual;
    }) 
    console.log(objetoMesAtual)
    const [botOpenModal, setBotOpenModal] = useState(false)
    const [botCheckAnimation, setbotCheckAnimation] = useState(false)
    const [botOpenDeleteDiaModal, setBotOpenDeleteDiaModal] = useState(false);
    const [totalToLeft, setTotalToLeft] = useState(false)
    const [showAnimationCaixaCheck, setshowAnimationCaixaCheck] = useState(false)
    const [valorTotal, setValorTotal] = useState(0);
    const [botAcionarEdicao, setBotAcionarEdicao] = useState(false)
    const titulo = gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano);
    const totalMarcado = useRef(0);
    const [arrayDiasAlterar, setArrayDiasAlterar] = useState(() => {
        const arrayFullDias = localStorage.getItem('ARR_FULL_DIAS');
        if(arrayFullDias) {
            return JSON.parse(arrayFullDias);
        }
        return objArrayFullDiasAndObjMesAtual.arrayFullMes
    });
    const [atualizacao, setAtualizacao] = useState(() => {
        const estadoAtualizacao = localStorage.getItem('_ATUALIZACAO_') ?? true;

        return estadoAtualizacao;
    });
    console.log(`Estado da atualizacao => ${atualizacao}`);
    const timerMostrarChekAnimacao = useRef(null);
    const timerEsconderChekAnimacao = useRef(null);
    const timerAnimacaoBotaoChek = useRef(null);
    const objUltimoDiaEscolhido = useRef({id: null, invalido: null});
    const idDiaSerTrocado = useRef(null);
    const objDiaSerDeletado = useRef({id: null, dataFormatada: null});

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
            if(timerMostrarChekAnimacao.current) 
                clearTimeout(timerMostrarChekAnimacao.current);

            timerMostrarChekAnimacao.current = setTimeout(() => {
                setshowAnimationCaixaCheck(true)
            }, 1000)
        }else {
            if(totalToLeft && showAnimationCaixaCheck) {
                if(timerEsconderChekAnimacao.current)
                    clearTimeout(timerEsconderChekAnimacao);

                timerEsconderChekAnimacao.current = setTimeout(() => {
                    setTotalToLeft(false)
                }, 1000)
                setshowAnimationCaixaCheck(false)
            }
        }
    },[objetoMesAtual])
    
    useEffect(() => {
        localStorage.setItem('ARR_FULL_DIAS', JSON.stringify(arrayDiasAlterar));
    },[arrayDiasAlterar]);

    useEffect(() => {
        localStorage.setItem('_ATUALIZACAO_', atualizacao);
    }, [atualizacao]);

    function toggle(id) {
        setObjetoMesAtual(prev => ({...prev, arrayDias: prev.arrayDias.map((item) => item.id === id ? {...item, marcado: !item.marcado} : item)}));
    }

    function toggleModal() {
        if(!botOpenModal) {
            if(timerAnimacaoBotaoChek.current)
                clearTimeout(timerAnimacaoBotaoChek.current);
            timerAnimacaoBotaoChek.current = setTimeout(() => {
                setBotOpenModal((prev) => !prev)
            }, 800)
            setbotCheckAnimation((prev) => !prev) 
        } else {
            setbotCheckAnimation((prev) => !prev) 
            setBotOpenModal((prev) => !prev)
        }
    }

    function toggleEdicao() {
        setBotAcionarEdicao((prev) => !prev);
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
        const novoObjetoMesAtualEArrayFullDias = gerarArrayTodosOsDiasProximoMesEObjetoMesAtualProximoMes(objetoMesAtual);

        localStorage.setItem('objMesAtual', JSON.stringify(novoObjetoMesAtualEArrayFullDias.objMesAtual));
        localStorage.setItem('ARR_FULL_DIAS', JSON.stringify(novoObjetoMesAtualEArrayFullDias.arrayFullMes));
        setObjetoMesAtual(novoObjetoMesAtualEArrayFullDias.objMesAtual);
        setArrayDiasAlterar(novoObjetoMesAtualEArrayFullDias.arrayFullMes);
        toggleModal()
    }

    //Funcao que abre o modal perguntando se quer mesmo deletar o dia com alguns dados do dia clicado para deletar e fecha o mesmo modal resetando o valor do objDiaSerDeletado
    function toggleModalDeletarDia(e) {
        if(!botOpenDeleteDiaModal) {

            const liElement = e.currentTarget.closest('.check');
            console.log(`Id do elemento que será deletado => ${liElement.dataset.id}`);
            const elementoEcontrado = objetoMesAtual.arrayDias.find((dia) => dia.id === liElement.dataset.id);
    
            objDiaSerDeletado.current = {id: elementoEcontrado.id, dataFormatada: elementoEcontrado.dataFormatada};
        } else {
            objDiaSerDeletado.current = null;
        }

        setBotOpenDeleteDiaModal((prev) => !prev);
        setBotOpenModal((prev) => !prev);

    }

    const listaUl = <ul className='checklist'>
        {objetoMesAtual.arrayDias.map((dia) => 
        <li 
            data-id={dia.id}
            key={dia.id} 
            className={"check border-bottom"} 
            >
            <div className='cont-dia'>
                <input 
                    type="checkbox" 
                    id={dia.id}
                    checked={dia.marcado}
                    onChange={() =>  {
                        if(!botAcionarEdicao) {
                            toggle(dia.id)
                        }
                    }}
                    />
                <label 
                    className={dia.marcado ? 'marcado' : undefined}
                    htmlFor={dia.id}
                    onClick={() => {
                        if(botAcionarEdicao) {
                            const diaDoArrayFullDias = arrayDiasAlterar.find((diaEncontrar) => diaEncontrar.id === dia.id);

                            objUltimoDiaEscolhido.current = {id: dia.id, invalido: diaDoArrayFullDias.invalido};

                            idDiaSerTrocado.current = dia.id;

                            setArrayDiasAlterar(prev => prev.map((dias) => dias.id === dia.id ? {...dias, marcado: true, invalido: false} : dias)) 
                            setBotOpenModal((prev) => !prev)
                        }
                    }}
                    >
                    {dia.dataFormatada}
                </label>
            </div>
            
            <div className={botAcionarEdicao ? 'situ-dia' : 'situ-dia esconder-bot-remover-dia'}>
                <small 
                className={dia.marcado ? "ok" : "badge"}>
                    {dia.marcado ? "Ok" : "Pendendte"}
                </small>
                <button
                className='remove-dia'
                onClick={toggleModalDeletarDia}
                >−</button>
            </div>
            
        </li>)}
    </ul> 

    
    const listaDiasParaAlterar = arrayDiasAlterar.map((dia) => 
        <div 
            className={dia.invalido ? 
                'day-card unavailable' : dia.marcado ? 
                'day-card active' : 'day-card'} 
            key={dia.id}
            data-id={dia.id}
        >
        <span className="date">{dia.dataNumerosString}</span>
        <span className="day-name">{dia.nomeDiaSemana}</span>
        </div>) 

    const diaAtualTitulo = gerarDataAtualTitulo()

    function handlerEscolhaDiaAlterar(e) {
        if(!e.target) return;

        const cardDiaAlterarEscolhido = e.target.closest('.day-card');

        if(!cardDiaAlterarEscolhido) return;

        if(cardDiaAlterarEscolhido.classList.contains('unavailable') ||  cardDiaAlterarEscolhido.classList.contains('active')) return

        if(objUltimoDiaEscolhido.current) {
            // retornando um novo array do full dias desmarcando o ultimo elemento escolhido e marcando o novo (toggle)
            const ultimoElementoEscolhido = objUltimoDiaEscolhido.current;
            console.log(`Valor do ultimo dia escolhido => ${ultimoElementoEscolhido.id} ${ultimoElementoEscolhido.invalido}`);

            const elementoEscolhido = arrayDiasAlterar.find((dia) => dia.id === cardDiaAlterarEscolhido.dataset.id)
            
            objUltimoDiaEscolhido.current = {id: elementoEscolhido.id, invalido: elementoEscolhido.invalido};

            // const novoArr = arrayDiasAlterar.map((dias) => dias.id === ultimoElementoEscolhido.id ? {...dias, marcado: false, invalido: ultimoElementoEscolhido.invalido} : dias.id === cardDiaAlterarEscolhido.dataset.id ? {...dias, marcado: true} : dias)

            //console.log(novoArr);

            setArrayDiasAlterar((prev) => prev.map((dias) => dias.id === ultimoElementoEscolhido.id ? {...dias, marcado: false, invalido: ultimoElementoEscolhido.invalido} : dias.id === cardDiaAlterarEscolhido.dataset.id ? {...dias, marcado: true} : dias))

            //console.log("NOVO ARRAY DIAS ALTERAR DEPOIS DE ESCOLHER OUTRO ABAIXO");
            //console.log(novoArrDiasAlterar);
        }

    }

    function fecharModalAndResetarUltimodIdDoDiaEscolhido() {
        const elementoDiaEscolhido = objUltimoDiaEscolhido.current;
        objUltimoDiaEscolhido.current = null
        setArrayDiasAlterar(prev => prev.map((dias) => dias.id ===  elementoDiaEscolhido.id ? {...dias, marcado: false, invalido: elementoDiaEscolhido.invalido} : dias)) 
        setBotOpenModal((prev) => !prev)
    }

    function salvarAlteracaoDiaAndResetarIdDoDiaParaAlterar() {
        const caixaDiasAlterar = document.querySelector('.calendar-container');

        const elementoEscolhido = caixaDiasAlterar.querySelector('.active');

        console.log(`Array dos dias para alterar abaixo`);
        console.log(arrayDiasAlterar);

        const elementoEscolhidoEncontrado = arrayDiasAlterar.find((dia) => dia.id === elementoEscolhido.dataset.id);

        const elementoDiaParaSerTrocado = objetoMesAtual.arrayDias.find((dia) => dia.id === idDiaSerTrocado.current);

        const objNovoDiaParaArrayDias = {
            id: elementoEscolhidoEncontrado.id,
            dataFormatada: elementoEscolhidoEncontrado.dataFormatada,
            valor: elementoDiaParaSerTrocado.valor,
            marcado: elementoDiaParaSerTrocado.marcado
        }

        console.log(`Dia do obj escolhido encontrado no array dias alterar => ${elementoEscolhidoEncontrado.dataNumerosString}`);

        console.log(`Id do elemento que será modificado => ${idDiaSerTrocado.current}`);

        //Trocar o dia clicado para alterar pelo dia escolhido no arrayDias
        //const novoArrDias = objetoMesAtual.arrayDias.map((dia) => dia.id === elementoDiaParaSerTrocado.id ? objNovoDiaParaArrayDias : dia);

        setObjetoMesAtual(prev => ({...prev, arrayDias: prev.arrayDias.map((dia) => dia.id === elementoDiaParaSerTrocado.id ? objNovoDiaParaArrayDias : dia)}));

        //Alterando os valores trocados no array full dias
        //const novoArrFullDias = arrayDiasAlterar.map((dia) => dia.id === elementoDiaParaSerTrocado.id ? {...dia, invalido: false} : dia.id === elementoEscolhidoEncontrado.id ? {...dia, marcado: false, invalido: true} : dia);

        setArrayDiasAlterar((prev) => prev.map((dia) => dia.id === elementoDiaParaSerTrocado.id ? {...dia, invalido: false} : dia.id === elementoEscolhidoEncontrado.id ? {...dia, marcado: false, invalido: true} : dia));

        setBotOpenModal((prev) => !prev)
    }

    function deletarDia() {
        console.log(`obj dia ser deletado => ${objDiaSerDeletado.current.id}`);
        const idDeletar = objDiaSerDeletado.current.id;
        //const novoArrDias = objetoMesAtual.arrayDias.filter((dia) => dia.id !== objDiaSerDeletado.current.id);
        // console.log("Novo array dias abaixo");
        // console.log(novoArrDias);
        setObjetoMesAtual(prev => ({...prev, arrayDias: prev.arrayDias.filter((dia) => dia.id !== idDeletar)}));

        setArrayDiasAlterar((prev) => prev.map((dia) => dia.id === idDeletar ? {...dia, marcado: false, invalido: false} : dia));
        
        setBotOpenDeleteDiaModal((prev) => !prev);
        setBotOpenModal((prev) => !prev)
        objDiaSerDeletado.current = null;
    }

    function atualizar() {
        //chamar funcao gerarArrayTodosOsDiasMesAtualAndObjMesAtual
        //fazer uma funcao igual mas com valor para ser passado
        //passar o objMesAtual para a funcao
        //crio o array de todos os dias pegando o mes e o ano do objeto
        //crio o array dias do mes atual verificando o array atual do objMesAtual e copio o valor marcado para ficar igual ao valores anteriores do usuario.
        const novoObjMesAtualEArrFullDias = gerarArrayTodosOsDiasMesAtualAndObjMesAtualParaAtualizacao(objetoMesAtual);

        //Receber dessa funcao um objeto com o objeto do mes atual e o array do full dias
        //separa esses valores em variaveis para melhor legibilidade
        //setar estado do objeto mes atual, array full dias e da atualizacao
        const novoObjetoMesAtual = novoObjMesAtualEArrFullDias.objMesAtual;
        const novoArraFullDias = novoObjMesAtualEArrFullDias.arrayFullMes;

        setObjetoMesAtual(novoObjetoMesAtual);
        setArrayDiasAlterar(novoArraFullDias);
        setAtualizacao(false);
    }

    return(
        <>
            <div className='conteudo'>
                <div className={totalToLeft ? 'set-borda calendar' : 'calendar'}>
                    <div className='titulo'>
                        <div>
                            <h1>{titulo}</h1>
                            <p className='data-titulo'>{diaAtualTitulo}</p>
                        </div>
                        
                        <button className='bot-edit' onClick={toggleEdicao}>{botAcionarEdicao ? "✓" : "Edit"}</button>
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
            {atualizacao === true ? 
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
                <Modal isOpen={botOpenModal}>
                {/* Verificar o acionar edicao e bot delete clicado juntos para mostrar modal para deletar dia */}
                {botAcionarEdicao && botOpenDeleteDiaModal ?
                    <div 
                    className='janela-modal janela-modal-para-deletar-dia'
                    data-id={objDiaSerDeletado.current.id}
                    >
                        <div className="text">
                            <h2>Deseja deletar o dia "{objDiaSerDeletado.current.dataFormatada}" ?</h2>
                            <p>Ao clicar em confirmar a ação não poderá ser desfeita.</p>
                        </div>
                        <div className="options">
                            <button onClick={toggleModalDeletarDia} className="bot-modal">Cancel</button>
                            <button onClick={deletarDia} className="bot-modal fechar">Confirmar</button>
                        </div>
                    </div>
                : botAcionarEdicao ?
                    <div className='janela-modal janela-modal-para-alterar-dia'>
                        <div className="header-alterar-dia">
                            <h2>Alterar dia</h2>
                            <div className='calendar-container' onClick={handlerEscolhaDiaAlterar}>
                                {listaDiasParaAlterar}
                            </div> 
                        </div>
                        <div className="options">
                            <button onClick={fecharModalAndResetarUltimodIdDoDiaEscolhido} className="bot-modal">Cancel</button>
                            <button onClick={salvarAlteracaoDiaAndResetarIdDoDiaParaAlterar} className="bot-modal fechar">Salvar</button>
                        </div>
                    </div>
                :
                    <div className='janela-modal janela-modal-para-fechar-mes'>
                        <div className="text">
                            <h2>Deseja fechar esse mês ?</h2>
                            <p>Ao fechar o mês, será gerado uma nova lista com as aulas do mês seguinte.</p>
                        </div>
                        <div className="options">
                            <button onClick={toggleModal} className="bot-modal">Cancel</button>
                            <button onClick={fecharMes} className="bot-modal fechar">Fechar</button>
                        </div>
                    </div>
                }
                </Modal>
            }
            
        </>
    )
}

export default MesAtual;