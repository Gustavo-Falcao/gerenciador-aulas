function EditModal({onHandlerEscolhaDiaAlterar, boxRef, listaDiasParaAlterar, onFecharModalAndResetarUltimodIdDoDiaEscolhido, onSalvarAlteracaoDiaAndResetarIdDoDiaParaAlterar}) {

    return (
         <div className='janela-modal janela-modal-para-alterar-dia'>
            <div className="header-alterar-dia">
                <h2>Alterar dia</h2>
                <div 
                className='calendar-container' 
                onClick={onHandlerEscolhaDiaAlterar}
                ref={boxRef}
                >
                    {listaDiasParaAlterar}
                </div> 
            </div>
            <div className="options">
                <button onClick={onFecharModalAndResetarUltimodIdDoDiaEscolhido} className="bot-modal">Cancel</button>
                <button onClick={onSalvarAlteracaoDiaAndResetarIdDoDiaParaAlterar} className="bot-modal fechar">Salvar</button>
            </div>
        </div>
    )

}

export default EditModal;