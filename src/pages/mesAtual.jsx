import '../styles/mesAtual.css';
import { gerarListaMes , gerarTitulo} from '../helpers/handlerDias';

function MesAtual() {
    const dias = gerarListaMes();
    const listaUl = <ul className='checklist clean'>
        {dias.map((dia) => 
        <li key={dia.id} className={dias.length === (dias.indexOf(dia))+1 ? "check" : "check border-bottom" } >
        <input type="checkbox" id={dia.id}/>
        <label htmlFor={dia.id}>{dia.dataFormatada}</label>
        <small className='badge'>Pendente</small>
    </li>)}
    </ul> 
    const data = dias[0];
    const titulo = gerarTitulo(data.infoData);

    return(
        <>
            <div className='conteudo'>
                <div className='box-dias'>
                    <h1>{titulo}</h1>
                    {listaUl}
                </div>
                <div className='total'>
                    <span>Total:</span>
                    <span>R$ 270,00</span>
                </div>
            </div>
            
        </>
    )
}

export default MesAtual;