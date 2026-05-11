function FecharMesModal({onToggleModal, onFecharMes}) {
    return (
        <div className='janela-modal'>
            <div className="text">
                <h2>Deseja fechar esse mês ?</h2>
                <p>Ao fechar o mês, será gerado uma nova lista com as aulas do mês seguinte.</p>
            </div>
            <div className="options">
                <button onClick={onToggleModal} className="bot-modal">Cancel</button>
                <button onClick={onFecharMes} className="bot-modal fechar">Fechar</button>
            </div>
        </div>
    )
}

export default FecharMesModal;