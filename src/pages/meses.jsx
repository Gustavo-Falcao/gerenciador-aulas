import { useMemo, useRef, useState } from 'react';
import { gerarTitulo } from '../helpers/handlerDias.js';
import { formatarDinheiro } from '../helpers/handlerCurrency.js';
import Modal from '../components/modal.jsx';
import cruzIcon from '../assets/cruz.svg'
import '../styles/meses.css';
function Meses() {

    const [meses, setMeses] = useState(() => {
        const objeto = localStorage.getItem('objMes');
        if(objeto) {
            return JSON.parse(objeto)
        }
        return null
    })

    const anos = [
        {value: 0, label: "Todos"},
        {value: 2024, label: "2024"},
        {value: 2025, label: "2025"},
        {value: 2026, label: "2026"},
    ];

    const [ano, setAno] = useState("")
    const [buscaMes, setBuscaMes] = useState("");
    const [botModal, setBotModal] = useState(false)

    const listaForModal = useRef([])
    const keyTimeOutBusca = useRef(null)

    function abrirModal(arrayDias) {
        listaForModal.current = arrayDias
        setBotModal(true);
    }

    function gerarMes(valor) {
        const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        return meses[valor];
    }

    const mesesFiltrados = useMemo(() => {
        if(!meses) {
            return
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
    },[ano, buscaMes]);

    function handlerBuscaMes(e) {
        const currentValue = e.currentTarget.value;

        if(keyTimeOutBusca.current) clearTimeout(keyTimeOutBusca.current);

        keyTimeOutBusca.current = setTimeout(() => {
            setBuscaMes(currentValue.trim());
        }, 600);
    }

    return (
        <>
            <div className="container">
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
                    {meses === null ? <p>Nenhum mes ainda...</p> 
                    : 
                    mesesFiltrados.length === 0 ? <p>Nenhum mes encontrado...</p> 
                    :
                    mesesFiltrados.map((mes) => (
                        <article className='card' key={mes.id}>
                            <div className='row'>
                                <div>
                                    <strong>{gerarTitulo(mes.mes, mes.ano)}</strong>
                                </div>
                                <span className='status'>Pago</span>
                            </div>
                            <div>
                                {mes.quantAula} aulas • {formatarDinheiro(mes.valorTotal)}
                            </div>
                            <div className='actions'>
                                <details>
                                    <summary className='btn' onClick={() => abrirModal(mes.arrayDias)}>Ver detalhes</summary>
                                </details>
                            </div>
                        </article>
                    ))}
                </section>

            </div>
            <Modal isOpen={botModal}>
                <span className='bot-sair' onClick={() => setBotModal(false)}> 
                    <img src={cruzIcon} className='icon' alt="Cruz icon" />
                    </span>
                <div className='janela-modal janela-modal-para-mostrar-meses'>
                    <ul className='list-aula'>
                        {listaForModal.current.map((aula) => (
                            <li key={aula.id}>{aula.dataFormatada}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </>
    )
}

export default Meses;