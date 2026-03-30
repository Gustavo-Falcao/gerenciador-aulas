import { useEffect } from "react";

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

    useEffect(() => {
        if(!isOpen) return;

        const body = document.body;
        const scrollY = window.scrollY;

        const originalTop = body.style.top;
        const originalWidth = body.style.width;

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        return () => {
            body.style.position = "";
            body.style.top = originalTop;
            body.style.width = originalWidth;

            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);


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