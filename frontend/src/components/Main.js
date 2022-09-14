import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <button className="profile__avatar-edit-button" type="button" title="Обновить аватар" onClick={props.onEditAvatar}>
            <img className="profile__avatar"  src={currentUser.avatar} alt={currentUser.name}/>
          </button>
          <div className="profile__describe">
            <div className="profile__title-wrapper">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" title="Редактировать профиль" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" title="Добавить новую фотографию" onClick={props.onAddPlace}/>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card, id) => (
            <Card
              key={id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
};

export default Main;
