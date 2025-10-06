import '../styles/mesAtual.css';
function MesAtual() {
    return(
        <>
            <div className='conteudo'>
                <div className='box-dias'>
                    <h1>Janeiro 2025</h1>
                    <ul className="checklist clean">
                        <li className="check border-bottom">
                            <input id="l1" type="checkbox" />
                            <label htmlFor='l1'>01/10 - Quarta-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l2" type="checkbox" />
                            <label htmlFor="l2">06/10 - Segunda-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l3" type="checkbox" />
                            <label htmlFor="l3">08/10 - Quarta-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l4" type="checkbox" />
                            <label htmlFor="l4">13/10 - Segunda-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l5" type="checkbox" />
                            <label htmlFor="l5">15/10 - Quarta-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l6" type="checkbox" />
                            <label htmlFor="l6">20/10 - Segunda-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l7" type="checkbox" />
                            <label htmlFor="l7">22/10 - Quarta-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check border-bottom">
                            <input id="l8" type="checkbox" />
                            <label htmlFor="l8">27/10 - Segunda-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                        <li className="check">
                            <input id="l9" type="checkbox" />
                            <label htmlFor="l9">29/10 - Quarta-Feira</label>
                            <small className="badge">Pendente</small>
                        </li>
                    </ul>
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