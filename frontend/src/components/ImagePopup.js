function ImagePopup({ card, isOpen, onClose, onCloseClick }) {

  return (
    <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseClick}>
      <figure className="popup__container popup__container_type_image">
        <button className="popup__close-button popup__close-button_type_image" type="button" title="Закрыть" onClick={onClose}/>
        <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''}/>
        <figcaption className="popup__figcaption">{card ? card.name : ''}</figcaption>
      </figure>
    </section>
  );
};

export default ImagePopup;
