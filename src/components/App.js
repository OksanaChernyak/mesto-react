import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {api} from "../utils/Api";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export default App;

function App() {

    const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getUserData()
            .then((res) => {
                setCurrentUser(res);
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

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.addLikeToCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
        } else {
            api.deleteLikeFromCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(name, about) {
        api.changeUserData(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                    setCurrentUser(res);
                    closeAllPopups()
                }
            )
    }

    function handleAddPlaceSubmit(name, link) {
        api.addCardtoServer(name, link)
            .then((res) => {
                setCards([res, ...cards])
                closeAllPopups()
            })
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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header/>
                    <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                          onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete} onClose={closeAllPopups}
                          cards={cards} selectedCard={selectedCard}/>
                    <Footer/>

                    <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

                    <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>
                    <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}/>


                    <PopupWithForm name="delete" title="Вы уверены?" btnText="Да"/>


                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

