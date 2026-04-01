function DeleteModalConteudo({idObjSerDeletado, children}) {
    return ( 
        <div 
        className='janela-modal janela-modal-para-deletar-dia'
        data-id={idObjSerDeletado}
        >
            {children}
        </div>
    )
}

export default DeleteModalConteudo;