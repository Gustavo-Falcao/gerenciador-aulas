function Modal({isOpen, onFecharModal, onFecharMes}) {
    if (isOpen) {
        return (
            <div className='background-modal'>
                <div className='janela-modal'>
                    <div className="text">
                        <h2>Deseja fechar esse mês ?</h2>
                        <p>Ao fechar o mês, será gerado uma nova lista com as aulas do mês seguinte.</p>
                    </div>
                    <div className="options">
                        <button onClick={onFecharModal} className="bot-modal">Cancel</button>
                        <button onClick={onFecharMes} className="bot-modal fechar">Fechar</button>
                    </div>
                </div>
            </div> 
        )
    }
}

export default Modal;