import React from 'react';
import Card from "./Card";

function Main(props) {
    return (
        <main className="main">
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__avatar-button"></button>
                <img
                    className="profile__pic"
                    alt="аватарка"
                    src={props.data.userAvatar}
                />
                <div className="profile__info">
                    <h1 className="profile__title">{props.data.userName}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button"></button>
                    <p className="profile__subtitle">{props.data.userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button"></button>
            </section>

            <section>
                <ul className="places">
                    {props.cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;