function DeleteModalConteudo({objDiaSerDeletado, onToggleModalDeletarDia, onDeletarDia}) {
    return ( 
        <div 
        className='janela-modal janela-modal-para-deletar-dia'
        data-id={objDiaSerDeletado.current.id}
        >
            <div className="text">
                <h2>Deseja deletar o dia "{objDiaSerDeletado.current.dataFormatada}" ?</h2>
                <p>Ao clicar em confirmar a ação não poderá ser desfeita.</p>
            </div>
            <div className="options">
                <button onClick={onToggleModalDeletarDia} className="bot-modal">Cancel</button>
                <button onClick={onDeletarDia} className="bot-modal fechar">Confirmar</button>
            </div>
        </div>
    )
}

export default DeleteModalConteudo;