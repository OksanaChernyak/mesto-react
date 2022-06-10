import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import avatarDefault from "../images/profile__pic.png";
import {api} from "../utils/Api";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

export default App;

function App() {
    const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
    const [userName, setUserName] = React.useState("John Doe");
    const [userDescription, setUserDescription] = React.useState("Nobody");
    const [userAvatar, setUserAvatar] = React.useState(`${avatarDefault}`);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        api.getUserData()
            .then((userServerData) => {

                setUserName(userServerData.name);
                setUserDescription(userServerData.about);
                setUserAvatar(userServerData.avatar);
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cardsData) => {
                    setCards(cardsData);
                }
            )
            .catch((err) => {
                alert(err);
            });
    }, []);


    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function closeAllPopups() {
        setIsProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <div className="page">
            <div className="page__content">
                <Header/>
                <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onClose={closeAllPopups}
                      cards={cards} selectedCard={selectedCard} userName={userName} userDescription={userDescription}
                      userAvatar={userAvatar}/>
                <Footer/>

                <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                <PopupWithForm isOpen={isProfilePopupOpen} onClose={closeAllPopups} name="edit-form"
                               title="Редактировать профиль" btnText="Сохранить"
                               children={<fieldset className="popup__fields">
                                   <input
                                       className="popup__field popup__field_type_name"
                                       id="name-input"
                                       type="text"
                                       name="name"
                                       placeholder="Введите имя"
                                       minLength="2"
                                       maxLength="40"
                                       required
                                   />
                                   <span className="error name-input-error"></span>
                                   <input
                                       className="popup__field popup__field_type_description"
                                       id="description-input"
                                       type="text"
                                       name="about"
                                       placeholder="Укажите профессию"
                                       minLength="2"
                                       maxLength="200"
                                       required
                                   />
                                   <span className="error description-input-error"></span>
                               </fieldset>}/>

                <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="add-form"
                               title="Новое место" btnText="Создать" children={<fieldset className="popup__fields">
                    <input
                        className="popup__field popup__field_type_place"
                        id="place-input"
                        type="text"
                        name="name"
                        placeholder="Введите название места"
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="error place-input-error"></span>
                    <input
                        className="popup__field popup__field_type_link"
                        id="link-input"
                        type="url"
                        name="link"
                        placeholder="Укажите ссылку на картинку"
                        required
                    />
                    <span className="error link-input-error"></span>
                </fieldset>}/>

                <PopupWithForm name="delete" title="Вы уверены?" btnText="Да"/>

                <PopupWithForm isOpen={isAvatarPopupOpen} onClose={closeAllPopups} name="avatar-form"
                               title="Обновить аватар" btnText="Сохранить"
                               children={<fieldset className="popup__fields">
                                   <input
                                       className="popup__field popup__field_type_avatar"
                                       id="avatar-input"
                                       type="url"
                                       name="avatar"
                                       placeholder="Укажите ссылку на аватар"
                                       required
                                   />
                                   <span className="error avatar-input-error"></span>
                               </fieldset>}/>
            </div>
        </div>
    );
}

