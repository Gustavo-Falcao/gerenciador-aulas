function ButtonAnimate({isOpen, onToggle, isEdicaoAcionada}) {
    if(!isEdicaoAcionada) {

        return (
            <button
                type="button"
                onClick={onToggle}
                className={`burguer ${isOpen ? "is-open" : ""}`}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        )
    } else {
        return null;
    }
}

export default ButtonAnimate;