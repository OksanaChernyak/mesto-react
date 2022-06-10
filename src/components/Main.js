import React from 'react';
import Card from "./Card";

function Main({onEditAvatar, userAvatar, userName, onEditProfile, userDescription, onAddPlace, cards, onCardClick}) {
    return (
        <main className="main">
            <section className="profile">
                <button onClick={onEditAvatar} className="profile__avatar-button"></button>
                <img
                    className="profile__pic"
                    alt="аватарка"
                    src={userAvatar}
                />
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button"></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button"></button>
            </section>

            <section>
                <ul className="places">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;