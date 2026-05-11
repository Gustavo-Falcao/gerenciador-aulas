function DeleteModalConteudo({idObjSerDeletado, children}) {
    return ( 
        <div 
        className='janela-modal'
        data-id={idObjSerDeletado}
        >
            {children}
        </div>
    )
}

export default DeleteModalConteudo;