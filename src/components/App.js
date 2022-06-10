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
    const isProfilePopupOpen = false;
    const isAddPlacePopupOpen = false;
    const isAvatarPopupOpen = false;
    let userName;
    let userDescription;
    let userAvatar;
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [data, setData] = React.useState({
        userName: "John Doe",
        userDescription: "Nobody",
        userAvatar: `${avatarDefault}`
    });

    React.useEffect(() => {
        api.getUserData()
            .then((userServerData) => {
                setData({
                    userName: userServerData.name,
                    userDescription: userServerData.about,
                    userAvatar: userServerData.avatar
                })

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
        document.querySelector(".popup_type_avatar-form").classList.add("popup_opened");
        isAvatarPopupOpen = true;
    }

    function handleEditProfileClick() {
        document.querySelector(".popup_type_edit-form").classList.add("popup_opened");
        isProfilePopupOpen = true;
    };

    function handleAddPlaceClick() {
        document.querySelector(".popup_type_add-form").classList.add("popup_opened");
        isAddPlacePopupOpen = true;
    };

    function closeAllPopups() {
        document.querySelector(".popup_opened").classList.remove("popup_opened");
        isProfilePopupOpen = false;
        isAddPlacePopupOpen = false;
        isAvatarPopupOpen = false;
        setSelectedCard(null);
    }

    return (
        <div className="page">
            <div className="page__content">
                <Header/>
                <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onClose={closeAllPopups}
                      data={data} cards={cards} selectedCard={selectedCard}/>
                <Footer/>

                <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                <PopupWithForm isOpen={isProfilePopupOpen} onClose={closeAllPopups} name="edit-form"
                               title="Редактировать профиль" children={<fieldset className="popup__fields">
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
                    <button className="popup__save-button" type="submit">
                        Сохранить
                    </button>
                </fieldset>}/>

                <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="add-form"
                               title="Новое место" children={<fieldset className="popup__fields">
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
                    <button className="popup__save-button" type="submit">Создать</button>
                </fieldset>}/>

                <PopupWithForm name="delete" title="Вы уверены?" children={
                    <button className="popup__save-button" type="submit">Да</button>
                }/>

                <PopupWithForm isOpen={isAvatarPopupOpen} onClose={closeAllPopups} name="avatar-form"
                               title="Обновить аватар" children={<fieldset className="popup__fields">
                    <input
                        className="popup__field popup__field_type_avatar"
                        id="avatar-input"
                        type="url"
                        name="avatar"
                        placeholder="Укажите ссылку на аватар"
                        required
                    />
                    <span className="error avatar-input-error"></span>
                    <button className="popup__save-button" type="submit">Сохранить</button>
                </fieldset>}/>
            </div>
        </div>
    );
}

