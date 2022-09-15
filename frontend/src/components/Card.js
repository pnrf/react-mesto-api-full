import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, link, name, likes, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__del-button ${isOwn ? '' : 'card__del-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  return (
    <li className="card">
      <img className="card__image" src={link} alt={name} title="Посмотреть в полном размере" onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" title="Удалить" onClick={handleDeleteClick}/>
      <div className="card__wrapper">
        <h2 className="card__title">{name}</h2>
        <div className="card__likes-wrapper">
          <button className={cardLikeButtonClassName} type="button" title="Нравится" onClick={handleLikeClick}/>
          <p className="card__likes-counter">{likes}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
