import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__del-button ${isOwn ? 'card__del-button_hidden' : ''}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }


  return (
    <li className="card">
      <img className="card__image" src={props.link} alt={props.name} title="Посмотреть в полном размере" onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" title="Удалить" onClick={handleDeleteClick}/>
      <div className="card__wrapper">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__likes-wrapper">
          <button className={cardLikeButtonClassName} type="button" title="Нравится" onClick={handleLikeClick}/>
          <p className="card__likes-counter">{props.likes}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
