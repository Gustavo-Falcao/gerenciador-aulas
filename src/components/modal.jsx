const STYLES_MODAL = {
    backgroundModal: {
        backgroundColor: 'rgba(160, 160, 160, 0.48)',
        backdropFilter: 'blur(1px)',
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '1000'
    }
}

function Modal({isOpen, children}) {
    if (isOpen) {
        return (
            <div style={STYLES_MODAL.backgroundModal}>
                {children}
            </div> 
        )
    } else {
        return null
    }
}

export default Modal;