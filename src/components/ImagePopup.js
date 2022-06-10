function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card && "popup_opened"}`}>
            <div className="popup__overlay">
                <img className="popup__pic" alt={props.card ? props.card.name : ''}
                     src={props.card ? props.card.link : ''}/>
                <p className="popup__pic-title">{props.card ? props.card.name : ''}</p>
                <button
                    className="popup__close-button popup__close-button_type_pic"
                    type="button"
                    aria-label="Закрыть попап"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    );
}

export default ImagePopup;