import '../styles/meses.css';
function Meses() {
    return (
        <div className="container">
            <header className="header">
                <div className="title">Histórico de Meses</div>
                <div className="filters">
                    <select className="select" aria-label="Selecionar ano">
                        <option value="" hidden>Ano</option>
                        <option value="">2025</option>
                        <option value="">2024</option>
                        <option value="">2023</option>
                    </select>
                    <input className="search" type="search" placeholder="Buscar: janeiro..." aria-label="Buscar"/>
                </div>
            </header>
            <section className="summary">
                <div>2025: <strong>10/12</strong>  meses pagos * Total no ano: <strong>R$ 3.210,00</strong></div>
                <div className="progress" aria-hidden="true"><span></span></div>
            </section>

            <section className="grid" id="grid">
                <article className="card" data-search="jan janeiro pago">
                    <div className="row">
                        <div><strong>JAN 2025</strong></div>
                        <span className="status">Pago</span>
                    </div>
                    <div>9 aulas • R$ 270,00</div>
                    <div className="actions">
                        <details>
                            <summary className="btn">Ver detalhes ▾</summary>
                            <div>Dias: 01/01, 03/01, 05/01, 08/01, 12/01, 15/01, 19/01, 22/01, 29/01</div>
                            <div>Observações: —</div>
                            <div><strong>Total:</strong> 9 x R$ 30,00 = R$ 270,00</div>
                        </details>
                    </div>
                </article>

                <article className="card" data-search="fev fevereiro pago">
                    <div className="row">
                        <div><strong>FEV 2025</strong></div>
                        <span className="status">Pago</span>
                    </div>
                    <div>8 aulas • R$ 240,00</div>
                    <div className="actions">
                        <details>
                            <summary className="btn">Ver detalhes ▾</summary>
                            <div>Dias: 02/02, 05/02, 07/02, 12/02, 16/02, 19/02, 23/02, 26/02</div>
                            <div>Observações: —</div>
                            <div><strong>Total:</strong> 8 x R$ 30,00 = R$ 240,00</div>
                        </details>
                    </div>
                </article>

                <article className="card" data-search="mar março ajustado ajuste">
                    <div className="row">
                        <div><strong>MAR 2025</strong></div>
                        <span className="status adjust">Ajustado ✎</span>
                    </div>
                    <div>10 aulas • R$ 300,00</div>
                    <div className="actions">
                        <details>
                            <summary className="btn">Ver detalhes ▾</summary>
                            <div>Dias: 01/03, 06/03, 08/03, 13/03, 15/03, 20/03, 22/03, 27/03, 29/03, 31/03</div>
                            <div>Observações: 1 reposição; 1 ajuste de horário.</div>
                            <div><strong>Total:</strong> 10 x R$ 30,00 = R$ 300,00</div>
                        </details>
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Meses;