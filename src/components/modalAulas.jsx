function ModalAulas({isOpen, listaAulas}) {
    if(isOpen) {
        return (
            <div className='background-modal'>
                <span>sair</span>
                <div className='janela-modal'>
                    <ul>
                        {listaAulas.map((aula) => (
                            <li key={aula.id}>{aula.dataFormatada}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ModalAulas;