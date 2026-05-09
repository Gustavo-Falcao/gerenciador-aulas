function ButtonAnimate({isOpen, onToggle, isEdicaoAcionada}) {
    if(!isEdicaoAcionada) {

        return (
            <button
                type="button"
                onClick={onToggle}
                className={`header-menu ${isOpen ? "is-open" : ""}`}
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