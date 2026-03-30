import '../styles/mesAtual.css';
import { gerarTitulo, gerarDataAtualTitulo, gerarObjetoProximoMes, gerarArrayTodosOsDiasMesAtualAndObjMesAtual, gerarArrayTodosOsDiasMesAtualAndObjMesAtualParaAtualizacao, gerarArrayTodosOsDiasProximoMesEObjetoMesAtualProximoMes} from '../helpers/handlerDias';
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { formatarDinheiro } from '../helpers/handlerCurrency';
import Modal from '../components/modal';
import DeleteModalConteudo from '../components/deleteModal';
import EditModal from '../components/editModal';
import FecharMesModal from '../components/fecharMesModal';
import ButtonAnimate from '../components/buttonAnimate';
import MenuEditModal from '../components/menuEditModal';
import InputDinheiro from '../components/inputDinheiro';
import { gerarIdKey } from '../helpers/handlerId';
import exportar from '../assets/compartilhar.png';
import importar from '../assets/adicionar.png'

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
    const [isMenuAtivo, setIsMenuAtivo] = useState(false)
    const titulo = gerarTitulo(objetoMesAtual.mes, objetoMesAtual.ano);
    const [arrayDiasAlterar, setArrayDiasAlterar] = useState(() => {
        const arrayFullDias = localStorage.getItem('ARR_FULL_DIAS');
        if(arrayFullDias) {
            return JSON.parse(arrayFullDias);
        }
        return objArrayFullDiasAndObjMesAtual.arrayFullMes
    });
    const [menuFilesIsOpen, setMenuFilesIsOpen] = useState(false);
    const [menuEditIsOpen, setMenuEditIsOpen] = useState(false);
    const [isEditValorAulaAtivo, setIsEditValorAulaAtivo] = useState(false);
    const [valorAulaString, setValorAulaString] = useState(() => {
        const valor = localStorage.getItem('VALOR_AULA') || formatarValorAula("3000")
        return valor
    })
    const [valorAulaNumber, setValorAulaNumber] = useState(() => {
        const valorAulaNumberString = valorAulaString.replace(/\D/g,"").trim()
        const valorSerSalvo = Number(valorAulaNumberString) / 100
        console.log("Valor ser salvo no valorAulaNumber => ")
        console.log(valorSerSalvo)
        return valorSerSalvo
    })
    
    const totalMarcado = useRef(0);
    const timerMostrarChekAnimacao = useRef(null);
    const timerEsconderChekAnimacao = useRef(null);
    const timerAnimacaoBotaoChek = useRef(null);
    const objUltimoDiaEscolhido = useRef({id: null, invalido: null});
    const idDiaSerTrocado = useRef(null);
    const objDiaSerDeletado = useRef({id: null, dataFormatada: null});
    const boxRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem('objMesAtual', JSON.stringify(objetoMesAtual));
        } catch (e) {
            console.log(`Erro ao salvar no localStorage => ${e}`)
        }

        totalMarcado.current = objetoMesAtual.arrayDias.reduce((acc, dia) => {
        return acc + (dia.marcado ? 1 : 0);
        }, 0)

        console.log("Aula number somando 10 => " + valorAulaNumber + 10)
        console.log("Quant total marcado => " + totalMarcado.current)
        setValorTotal(totalMarcado.current * valorAulaNumber)

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
        console.log("Valor que está sendo inserido no valor aula do local storage => " + valorAulaString)
        localStorage.setItem('VALOR_AULA', valorAulaString);
        //atualizar no mes atual
        const novoObjeMesAtual = {...objetoMesAtual, arrayDias: objetoMesAtual.arrayDias.map((dia) => (
            {...dia, valor: valorAulaNumber}
        ))}
        //atualizar no array full dias
        const novoArrayFullDias = arrayDiasAlterar.map((dia) => (
            {...dia, valor: valorAulaNumber}
        ))

        setObjetoMesAtual(novoObjeMesAtual)
        setArrayDiasAlterar(novoArrayFullDias)

    }, [valorAulaNumber])

    useLayoutEffect(() => {
        if(!botOpenModal) return;
        if(botOpenDeleteDiaModal) return;
        const elemento = boxRef.current;

        if(!elemento) return;

        const indexElemento = arrayDiasAlterar.findIndex((dia) => dia.id === idDiaSerTrocado.current);
        
        //centralizando o dia clicado para deixar visivel no calendario
        // A partir do index 8 o elemento nao fica visivel
        if(indexElemento > 8) {
            let linhas = 0;//linhas para dar scroll
            for(let i = 1; i <= arrayDiasAlterar.length; i++) {
                if(i % 3 === 0) linhas++;//contando linhas pulando de 3 em 3 elementos, onda linha tem exatos 3 elementos
                
                if(i >= indexElemento) break;//se encontrar o index do elemento para a contagem de linhas
            }
            const valorMoverPrimeiraLinha = 109.5;//tem valor maior por causa do padding da caixa pai
            const valorMoverLinha = 97;//valor para mover qualquer linha que nao seja a primeira
            elemento.scrollTop = valorMoverPrimeiraLinha + (valorMoverLinha*(linhas-1));
        }
    }, [botOpenModal]);

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
        const objMesAtual = {id: gerarIdKey(), arrayDias: objetoMesAtual.arrayDias, ano: objetoMesAtual.ano, mes: objetoMesAtual.mes, quantAula: totalMarcado.current, valorTotal: valorTotal, arrayMes: arrayDiasAlterar};

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

    function abrirOpcoesAlterarDia(dia) {
        const diaDoArrayFullDias = arrayDiasAlterar.find((diaEncontrar) => diaEncontrar.id === dia.id);

        objUltimoDiaEscolhido.current = {id: dia.id, invalido: diaDoArrayFullDias.invalido};

        idDiaSerTrocado.current = dia.id;

        setArrayDiasAlterar(prev => prev.map((dias) => dias.id === dia.id ? {...dias, marcado: true, invalido: false} : dias)) 
        setBotOpenModal((prev) => !prev)
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
                           abrirOpcoesAlterarDia(dia);
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

    function toggleMenu() {
        if(menuFilesIsOpen)
            fecharMenuFiles()
        if(menuEditIsOpen)
            fecharMenuEdit()
        if(isEditValorAulaAtivo)
            fecharEditValorAula()

        setIsMenuAtivo((prev) => !prev)
        
    }

    function abrirMenuFiles() {
        setMenuFilesIsOpen(true)
    }

    function fecharMenuFiles() {
        setMenuFilesIsOpen(false)
    }

    function abrirMenuEdit() {
        setMenuEditIsOpen(true)
    }

    function fecharMenuEdit() {
        setMenuEditIsOpen(false)
    }

    function abrirEditValorAula() {
        setIsEditValorAulaAtivo(true)
    }

    function fecharEditValorAula() {
        setIsEditValorAulaAtivo(false)
    }

    const handleChange = (e) => {
        let valorDigitado = e.target.value

        valorDigitado = valorDigitado.replace(/\D/g,"")

        if(valorDigitado === "") {
            setValor("")
            return
        }

        setValorAulaString(formatarValorAula(valorDigitado))
    }

    function formatarValorAula(valor) {
        const valorNumerico = Number(valor) / 100

        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valorNumerico)

        return valorFormatado
    }

    function salvarValorAulaNumber() {
        console.log("Valor a ser salvo no valor aula number")
        const valorPuro = valorAulaString.replace(/\D/g,"")
        setValorAulaNumber(Number(valorPuro) / 100)
        //isMenuAtivo, isEditValorAulaAtivo, menuEditIsOpen
        toggleMenu()
    }

    return(
        <>
            <div className='conteudo'>
                <div className={totalToLeft ? 'set-borda calendar' : 'calendar'}>
                    <div className='titulo'>
                        <div className='header-title'>
                            <h1>{titulo}</h1>
                            <p className='data-titulo'>{diaAtualTitulo}</p>
                        </div>
                        
                        <div className='options-menu'>
                            
                               <ButtonAnimate
                                    isOpen={isMenuAtivo}
                                    onToggle={toggleMenu}
                                    isEdicaoAcionada={botAcionarEdicao}
                                ></ButtonAnimate>
                                
                                {isMenuAtivo && !botAcionarEdicao ?
                                    <div className={`menu ${isEditValorAulaAtivo ? 'menu-expandido-edit-valor-aula' : menuFilesIsOpen || menuEditIsOpen ? 'menu-expandido' : 'menu-edit'}`}> 
                                                    <MenuEditModal>
                                                        {menuFilesIsOpen ?
                                                            <div className='op-menu-expandido'>    
                                                                <div className='header-menu'>
                                                                    <button 
                                                                    className='bot-voltar'
                                                                    onClick={fecharMenuFiles}>
                                                                        <div className='seta'></div>
                                                                    </button>
                                                                    <span>JSON files</span>
                                                                </div>
                                                                <div className='options-menu-expandido'>
                                                                    <div
                                                                    className='option-com-icon'
                                                                    >
                                                                        <span>Inserir</span> 
                                                                        <img className='icon-import' src={importar}/>
                                                                    </div>
                                                                    <div
                                                                    className='option-com-icon'
                                                                    >
                                                                        <span>Exportar</span> 
                                                                        <img className='icon-export' src={exportar}/>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        : menuEditIsOpen ?

                                                            isEditValorAulaAtivo ? 
                                                                <div className='op-menu-edit-valor-aula'>
                                                                    <div className='header-menu'>
                                                                        <button 
                                                                        className='bot-voltar'
                                                                        onClick={fecharEditValorAula}
                                                                        >
                                                                            <div className='seta'></div>
                                                                        </button>
                                                                        <span>Editar Valor Aula</span>
                                                                    </div>
                                                                    <div className='campo-valor'>
                                                                        
                                                                        <InputDinheiro 
                                                                        valorAula={valorAulaString}
                                                                        handleChange={handleChange}/>
                                                                        <button
                                                                        className='bot-salvar-valor-aula'
                                                                        onClick={salvarValorAulaNumber}
                                                                        >
                                                                            Salvar
                                                                        </button>
                                                                    </div>
                                                                    

                                                                </div>
                                                            :

                                                            <div className='op-menu-expandido'>    
                                                                <div className='header-menu'>
                                                                    <button 
                                                                    className='bot-voltar'
                                                                    onClick={fecharMenuEdit}
                                                                    >
                                                                        <div className='seta'></div>
                                                                    </button>
                                                                    <span>Editar</span>
                                                                </div>
                                                                <div className='options-menu-expandido'>
                                                                    <div
                                                                    onClick={toggleEdicao}
                                                                    >Dias</div>
                                                                    <div
                                                                    onClick={abrirEditValorAula}
                                                                    >Valor aula</div>
                                                                </div>
                                                            </div>
                                                        
                                                        :

                                                        <div className='op-menu-normal'>
                                                            <span
                                                            onClick={abrirMenuEdit}
                                                            >
                                                                Edit
                                                            </span>
                                                            <span
                                                            onClick={abrirMenuFiles}
                                                            >File</span>
                                                        </div>
                                                        }
                                                    </MenuEditModal>
                                    </div>
                                    
                                :

                                undefined
                                }
                                

                            {botAcionarEdicao &&  <button 
                                    className='bot-edit' 
                                    onClick={toggleEdicao}
                                >
                                    ✓
                                </button>}
                            
                            
                        </div>
                    </div>
                    {listaUl}
                </div>
                <div className={totalToLeft ? 'total total-to-left' : 'total'}>
                    <span>Total:</span>
                    <span>{formatarDinheiro(valorTotal)}</span>
                </div>
                <div className= {showAnimationCaixaCheck ? 'pai-caixa-check pai-caixa-check-show' : 'pai-caixa-check'} >
                    <div className={`caixa-check ${botCheckAnimation ? 'active' : 'inactive'}`}onClick={() => {
                        if(!botAcionarEdicao){
                          toggleModal() 
                        }
                    }}>
                <span className="material-symbols-outlined info-icon">check</span>
                </div>
                </div>
                
            </div>
                <Modal isOpen={botOpenModal}>
                {botAcionarEdicao && botOpenDeleteDiaModal ? 
                    <DeleteModalConteudo objDiaSerDeletado={objDiaSerDeletado} onToggleModalDeletarDia={toggleModalDeletarDia} onDeletarDia={deletarDia}/>

                    : botAcionarEdicao ?

                    <EditModal onHandlerEscolhaDiaAlterar={handlerEscolhaDiaAlterar} boxRef={boxRef} listaDiasParaAlterar={listaDiasParaAlterar} onFecharModalAndResetarUltimodIdDoDiaEscolhido={fecharModalAndResetarUltimodIdDoDiaEscolhido} onSalvarAlteracaoDiaAndResetarIdDoDiaParaAlterar={salvarAlteracaoDiaAndResetarIdDoDiaParaAlterar}/>

                    :

                    <FecharMesModal onToggleModal={toggleModal} onFecharMes={fecharMes}/>
                }
                </Modal>
        </>
    )
}

export default MesAtual;