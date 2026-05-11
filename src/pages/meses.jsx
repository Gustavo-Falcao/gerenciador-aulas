import { useEffect, useMemo, useRef, useState } from 'react';
import { gerarTitulo } from '../helpers/handlerDias.js';
import { formatarDinheiro } from '../helpers/handlerCurrency.js';
import Modal from '../components/modal.jsx';
import DeleteModalConteudo from '../components/deleteModal.jsx';
import cruzIcon from '../assets/cruz.svg';
import '../styles/meses.css';
function Meses() {

    const [meses, setMeses] = useState(() => {
        const objeto = localStorage.getItem('objMes');
        if(objeto) {
            return JSON.parse(objeto)
        }
        return []
    })

    const anos = [
        {value: 0, label: "Todos"},
        {value: 2024, label: "2024"},
        {value: 2025, label: "2025"},
        {value: 2026, label: "2026"},
    ];

    const [ano, setAno] = useState("")
    const [buscaMes, setBuscaMes] = useState("");
    const [botModal, setBotModal] = useState(false);
    const [arrayDiasCalendario, setArrayDiasCalendario] = useState([]);
    const [isDeletarMesAtivo, setIsDeletarMesAtivo] = useState(false)

    const keyTimeOutBusca = useRef(null)
    const tituloCalendario = useRef('')
    const infosCurrentMes = useRef({aulas: null, valorAula: 0})
    const primeiroDiaSemana = useRef('')
    const objMesSerDeletado = useRef({id: null, nome: null})

    useEffect(() => {
        console.log("O array mes será atualizado no local storage")
        console.log(meses)
        localStorage.setItem('objMes' ,JSON.stringify(meses))
    },[meses])

    function abrirModal(mes) {
        infosCurrentMes.current.aulas = mes.quantAula
        infosCurrentMes.current.valorAula = mes.valorTotal
        tituloCalendario.current = gerarTitulo(mes.mes, mes.ano)
        primeiroDiaSemana.current = mes.arrayMes[0].nomeDiaSemana
        setArrayDiasCalendario(mes.arrayMes)
        setBotModal(true);
    }

    function gerarMes(valor) {
        const mesesOptions = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        return mesesOptions[valor];
    }

    const mesesFiltrados = useMemo(() => {
        console.log("Array meses abaixo dentro do useMemo")
        console.log(meses)
        if(!meses || meses.length === 0) {
            return []
        }
        const filtradoMes = meses.filter(m => gerarMes(m.mes).toLocaleLowerCase().includes(buscaMes.toLocaleLowerCase()));

        if(ano) {
            if(Number(ano) !== 0) {
                const filtradoAno = filtradoMes.filter((m) => m.ano === Number(ano));
                return filtradoAno;
            }
        }

        console.log(`Ano escolhido => ${ano}`);
        return filtradoMes;
    },[ano, buscaMes, meses]);

    function handlerBuscaMes(e) {
        const currentValue = e.currentTarget.value;

        if(keyTimeOutBusca.current) clearTimeout(keyTimeOutBusca.current);

        keyTimeOutBusca.current = setTimeout(() => {
            setBuscaMes(currentValue.trim());
        }, 600);
    }


    function quantidadeDiasVazio(nomePrimeiroDiaSemana) {
        let quantDiasVazios = 0;
        
        switch (nomePrimeiroDiaSemana) {
            case "Domingo":
                quantDiasVazios = 0;
                break;
            case "Segunda": 
                quantDiasVazios = 1;
                break;
            case "Terça": 
                quantDiasVazios = 2;
                break;
            case "Quarta": 
                quantDiasVazios = 3;
                break;
            case "Quinta": 
                quantDiasVazios = 4;
                break;
            case "Sexta": 
                quantDiasVazios = 5;
                break;
            case "Sábado": 
                quantDiasVazios = 6;
                break;
        }
        return quantDiasVazios
    }

    function gerarDiaNumber(dia) {
        const [day, mes] = dia.split('/')
        return Number(day)
    }

    function gerarDiaCalendario(dia) {
        let data = dia.dataNumerosString;
        
        const diaSemZero = gerarDiaNumber(data)

        return <div key={dia.id} className={dia.invalido ? 'day is-done' : 'day'}>{diaSemZero}</div>
    }

    function ativarDeleteMes(mes) {
        objMesSerDeletado.current.id = mes.id
        objMesSerDeletado.current.nome = gerarTitulo(mes.mes, mes.ano)
        setBotModal(true)
        setIsDeletarMesAtivo(true)
    }

    function desativarDeleteMes() {
        // objMesSerDeletado.current.id = null
        // objMesSerDeletado.current.nome = null
        setIsDeletarMesAtivo(false)
        setBotModal(false)
    }

    function deletarMes() {
        console.log("Nome do mes que será deletado => " + objMesSerDeletado.current.nome)
        console.log("Id do mes que está sendo deletado => " + objMesSerDeletado.current.id)
        const idParaDeletar = objMesSerDeletado.current.id
        setMeses(prev => prev.filter((mes) => mes.id !== idParaDeletar))
        desativarDeleteMes()
    }

    return (
        <>     
                <div className='meses'>
                    <header className="header">
                        <div className="title">Histórico de Meses</div>
                        <div className="filters">
                            <select 
                                className="select"
                                name="ano"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>Ano</option>
                                {anos.map((a) => (<option key={a.value} value={a.value}>{a.label}</option>))}
                            </select>
                            <input id='search' className="search" type="search" placeholder="Buscar: janeiro..." aria-label="Buscar" onChange={handlerBuscaMes}/>
                        </div>
                    </header>
                    {/* <section className="summary">
                        <div>2025: <strong>10/12</strong>  meses pagos * Total no ano: <strong>R$ 3.210,00</strong></div>
                        <div className="progress" aria-hidden="true"><span></span></div>
                    </section> */}
                    <section className='grid' id='grid'>
                        {meses.length === 0 ? <p>Nenhum mes ainda...</p> 
                        : 
                        mesesFiltrados.length === 0 ? <p>Nenhum mes encontrado...</p> 
                        :
                        mesesFiltrados.map((mes) => (
                            <article className='card' key={mes.id}>
                                <div className='row'>
                                    <span className='card-title'>
                                        {gerarTitulo(mes.mes, mes.ano)}
                                    </span>
                                    
                                    <span className='status'>Pago</span>
                                </div>
                                <div className='card-info'>
                                    {mes.quantAula} aulas • {formatarDinheiro(mes.valorTotal)}
                                </div>
                                <hr className='divider'/>
                                <div className='actions'>
                                    <button 
                                    className='btn btn-details' 
                                    onClick={() => abrirModal(mes)}
                                    >
                                        Ver detalhes</button>  
                                    <button 
                                    className='btn btn-delete'
                                    onClick={() => ativarDeleteMes(mes)}
                                    >
                                        Deletar</button>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>

            
            <Modal isOpen={botModal}>

                {isDeletarMesAtivo ? 
                
                    <DeleteModalConteudo objSerDeletado={objMesSerDeletado.current.id}>
                        <div className="text">
                            <h2>Deseja deletar o mês "{objMesSerDeletado.current.nome}" ?</h2>
                            <p>Ao clicar em confirmar a ação não poderá ser desfeita.</p>
                        </div>
                        <div className="options">
                            <button 
                            onClick={desativarDeleteMes} className="bot-modal"
                            >
                                Cancel
                            </button>
                            <button 
                            onClick={deletarMes}
                            className="bot-modal fechar"
                            >
                                Confirmar
                            </button>
                        </div>
                    </DeleteModalConteudo>

                    :

            
                    <div className='janela-modal-calendario'>
                        <div className="calendar-header">
                            {tituloCalendario.current}
                        </div>
                        <span className='bot-sair' onClick={() => setBotModal(false)}> 
                        <img src={cruzIcon} className='icon' alt="Cruz icon" />
                        </span>
                            <div className="calendar-grid">
                                <div className="weekday">D</div>
                                <div className="weekday">S</div>
                                <div className="weekday">T</div>
                                <div className="weekday">Q</div>
                                <div className="weekday">Q</div>
                                <div className="weekday">S</div>
                                <div className="weekday">S</div>

                                {Array.from(
                                    {length: quantidadeDiasVazio(primeiroDiaSemana.current)},
                                    (_, index) => <div key={`empty-${index}`} className='day empty-day'></div>
                                )}

                                {arrayDiasCalendario.map((dia) => 
                                    gerarDiaCalendario(dia)   
                                )}
                            </div>
                        <div class="modal-summary">
                            <span class="modal-summary-text" id="modal-info">{infosCurrentMes.current.aulas} aulas</span>
                            <span class="modal-summary-value" id="modal-valor">{formatarDinheiro(infosCurrentMes.current.valorAula)}</span>
                        </div>
                    </div>
                
                
                }
            </Modal>
        </>
    )
}

export default Meses;