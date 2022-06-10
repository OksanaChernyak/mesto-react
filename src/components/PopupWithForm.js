function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <form
                name="{props.name}"
                className="popup__container"
                noValidate
            >
                <button
                    className="popup__close-button"
                    onClick={props.onClose}
                    type="button"
                    aria-label="Закрыть попап"
                ></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}

            </form>
        </div>
    );
}

export default PopupWithForm;