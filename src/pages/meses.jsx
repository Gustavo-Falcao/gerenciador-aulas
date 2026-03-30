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
    const [botModal, setBotModal] = useState(false);
    const [arrayDiasCalendario, setArrayDiasCalendario] = useState([]);

    const keyTimeOutBusca = useRef(null)
    const tituloCalendario = useRef('')
    const primeiroDiaSemana = useRef('')

    function abrirModal(mes) {
        // pegar o mes inteiro do mes atual
        // deixar como marcado os meses que tiveram aula
        // pegar o dia da semana do primeiro dia do mes
        // verificar quantos dias tem do primeiro dia do mes até o domingo para setar os dias vazios

        tituloCalendario.current = gerarTitulo(mes.mes, mes.ano)
        primeiroDiaSemana.current = mes.arrayMes[0].nomeDiaSemana
        setArrayDiasCalendario(mes.arrayMes)
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
                                    <summary className='btn' onClick={() => abrirModal(mes)}>Ver detalhes</summary>
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
                    {/* <ul className='list-aula'>
                        {listaForModal.current.map((aula) => (
                            <li key={aula.id}>{aula.dataFormatada}</li>
                        ))}
                    </ul> */}
                    <div class="calendar-header">
                        <h2>{tituloCalendario.current}</h2>
                    </div>

                        <div class="calendar-grid">
                            <div class="weekday">D</div>
                            <div class="weekday">S</div>
                            <div class="weekday">T</div>
                            <div class="weekday">Q</div>
                            <div class="weekday">Q</div>
                            <div class="weekday">S</div>
                            <div class="weekday">S</div>

                            {Array.from(
                                {length: quantidadeDiasVazio(primeiroDiaSemana.current)},
                                (_, index) => <div key={`empty-${index}`} className='day empty-day'></div>
                            )}

                            {arrayDiasCalendario.map((dia) => 
                                gerarDiaCalendario(dia)   
                            )}

                        </div>
                    {/* <div class="calendar-grid">
                        <div class="weekday">D</div>
                        <div class="weekday">S</div>
                        <div class="weekday">T</div>
                        <div class="weekday">Q</div>
                        <div class="weekday">Q</div>
                        <div class="weekday">S</div>
                        <div class="weekday">S</div>

                        <div class="day empty-day"></div>
                        <div class="day empty-day"></div>
                        <div class="day empty-day"></div>
                        <div class="day empty-day"></div>

                        <div class="day">1</div>
                        <div class="day">2</div>
                        <div class="day">3</div>
                        <div class="day">4</div>
                        <div class="day">5</div>
                        
                        <div class="day is-done">6</div> 
                        
                        <div class="day">7</div>
                        <div class="day">8</div>
                        <div class="day">9</div>
                        <div class="day">10</div>
                        <div class="day">11</div>
                        <div class="day">12</div>
                        <div class="day">13</div>
                        <div class="day">14</div>
                        <div class="day">15</div>
                        <div class="day">16</div>
                        <div class="day">17</div>
                        <div class="day">18</div>
                        <div class="day">19</div>
                        <div class="day">20</div>
                        <div class="day">21</div>
                        <div class="day">22</div>
                        <div class="day">23</div>
                        <div class="day">24</div>
                        <div class="day">25</div>
                        <div class="day">26</div>
                        <div class="day">27</div>
                        <div class="day">28</div>
                        <div class="day">29</div>
                        <div class="day">30</div>
                        <div class="day">31</div>
                    </div> */}
                </div>
            </Modal>
        </>
    )
}

export default Meses;