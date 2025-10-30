import cruzIcon  from '../assets/cruz.svg' 

function ModalAulas({isOpen, listaAulas, onClose}) {
    if(isOpen) {
        return (
            <div className='background-modal'>
                <span className='bot-sair' onClick={onClose}> 
                    <img src={cruzIcon} className='icon' alt="Cruz icon" />
                </span>
                <div className='janela-modal'>
                    <ul className='list-aula'>
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