import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="place">
            <img className="place__image" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
            <h2 className="place__title">{props.card.name}</h2>
            <button
                className="place__like"
                type="button"
                aria-label="Поставить лайк"
            ></button>
            <p className="place__like-counter">{props.card.likes.length}</p>
            <button
                className="place__delete"
                type="button"
                aria-label="Удалить карточку"
            ></button>
        </li>
    );
}

export default Card;