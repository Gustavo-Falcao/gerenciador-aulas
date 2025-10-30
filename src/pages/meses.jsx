import { useRef, useState } from 'react';
import { gerarTitulo } from '../helpers/handlerDias.js';
import { formatarDinheiro } from '../helpers/handlerCurrency.js';
import ModalAulas from '../components/modalAulas.jsx';
import '../styles/meses.css';
function Meses() {

    const [objMeses, setObjMeses] = useState(() => {
        const objeto = localStorage.getItem('objMes');
        if(objeto) {
            return JSON.parse(objeto)
        }
        return null
    })

    const anos = [
        {value: "a24", label: "2024"},
        {value: "a25", label: "2025"},
        {value: "a26", label: "2026"},
    ];

    const [ano, setAno] = useState("")

    const [botModal, setBotModal] = useState(false)

    const listaForModal = useRef([])

    function abrirModal(arrayDias) {
        listaForModal.current = arrayDias
        setBotModal((prev) => !prev)
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
                        <input id='search' className="search" type="search" placeholder="Buscar: janeiro..." aria-label="Buscar"/>
                    </div>
                </header>
                {/* <section className="summary">
                    <div>2025: <strong>10/12</strong>  meses pagos * Total no ano: <strong>R$ 3.210,00</strong></div>
                    <div className="progress" aria-hidden="true"><span></span></div>
                </section> */}
                <section className='grid' id='grid'>
                    {objMeses === null ? <p>Nenhum mes ainda...</p> : objMeses.map((mes) => (
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

                {/* <section className="grid" id="grid">
                    <article className="card" data-search="jan janeiro pago">
                        <div className="row">
                            <div><strong>JAN 2025</strong></div>
                            <span className="status">Pago</span>
                        </div>
                        <div>9 aulas • R$ 270,00</div>
                        <div className="actions">
                            <details>
                                <summary className="btn">Ver detalhes</summary>
                                <div>Dias: 01/01, 03/01, 05/01, 08/01, 12/01, 15/01, 19/01, 22/01, 29/01</div>
                                <div>Observações: —</div>
                                <div><strong>Total:</strong> 9 x R$ 30,00 = R$ 270,00</div>
                            </details>
                        </div>
                    </article>
                </section> */}
            </div>
            <ModalAulas isOpen={botModal} listaAulas={listaForModal.current} onClose={() => setBotModal((prev) => !prev)}/>
        </>
    )
}

export default Meses;