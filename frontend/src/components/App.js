import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import resolve from "../images/resolve.svg";
import reject from "../images/reject.svg";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mailName, setMailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setMailName(res.user.email);
          }
        })
        .catch((err) => {
          console.log(`Не удалось получить токен: ${err}`);
        })
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function onRegister(email, password) {
    auth.registerUser(email, password).then(() => {
      setPopupImage(resolve);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/signin");
    }).catch(() => {
      closeAllPopups();
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setMailName(email);
      navigate("/");
    }).catch(() => {
      closeAllPopups();
      setPopupImage(reject);
      setPopupTitle("Неверно указаны почта или пароль");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user.user);
          setCards(cards.reverse());
        })
        .catch(() => {
          closeAllPopups();
          setPopupImage(reject);
          setPopupTitle("Что-то пошло не так!");
          handleInfoTooltip();
        });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch(() => {
        closeAllPopups();
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так!");
        handleInfoTooltip();
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch(() => {
        closeAllPopups();
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так!");
        handleInfoTooltip();
      });
    }
  }

  function handleUpdateUser(data) {
    setLoading(true);
    api.updateUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так!");
      handleInfoTooltip();
    }).finally(() => {
      setLoading(false)
    });
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(() => {
      closeAllPopups();
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так!");
      handleInfoTooltip();
    }).finally(() => {
      setLoading(false)
    });
  }

  function handleDeleteCard(card) {
    api.removeCard(card).then(() => {
      setCards((items) => items.filter((c) => c !== card && c));
      closeAllPopups();
    }).catch(() => {
      closeAllPopups();
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так!");
      handleInfoTooltip();
    });
  }

  function handleAvatarUpdate(data) {
    api.updateProfileAvatar(data).then((newAvatar) => {
      setLoading(true);
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch(() => {
      closeAllPopups();
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так!");
      handleInfoTooltip();
    }).finally(() => {
      setLoading(false)
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
    setIsDeletePopupOpen(false);
  }

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || infoTooltip) {
      function handleEsc(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, infoTooltip]);

  function onSignOut() {
    setIsLoggedIn(false);
    setMailName(null);
    navigate("/signin");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Routes>
          <Route path="/signin" element={
            <>
              <Header title="Регистрация" route="/signup"/>
              <Login onLogin={onLogin} />
              <Footer />
            </>
          }/>

          <Route path="/signup" element={
            <>
              <Header title="Войти" route="/signin"/>
              <Register onRegister={onRegister} />
              <Footer />
            </>
          }/>

          <Route exact path="/" element={
            <>
              <Header title="Выйти" mail={mailName} onClick={onSignOut} route="" />
              <>
                <ProtectedRoute
                  component={Main}
                  cards={cards}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                />
                <Footer />
              </>
            </>
          }/>

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/signin"}/>} />
        </Routes>

        <AddPlacePopup
          isLoading = {isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onSubmit={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={selectedCard}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onSubmit={handleDeleteCard}
        />

        <EditAvatarPopup
          isLoading = {isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onSubmit={handleAvatarUpdate}
        />

        <EditProfilePopup
          isLoading = {isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
          onSubmit={handleUpdateUser}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
        />

        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
          onCloseClick={handlePopupCloseClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
