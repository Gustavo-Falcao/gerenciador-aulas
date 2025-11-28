const STYLES_MODAL = {
    backgroundModal: {
        backgroundColor: 'rgba(163, 163, 163, 0.57)',
        // backdropFilter: 'blur(2px)',
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