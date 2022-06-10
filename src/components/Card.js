import React from 'react';

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="place">
            <img className="place__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <h2 className="place__title">{card.name}</h2>
            <button
                className="place__like"
                type="button"
                aria-label="Поставить лайк"
            ></button>
            <p className="place__like-counter">{card.likes.length}</p>
            <button
                className="place__delete"
                type="button"
                aria-label="Удалить карточку"
            ></button>
        </li>
    );
}

export default Card;