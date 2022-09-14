function ImagePopup(props) {

  return (
    <section className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
      <figure className="popup__container popup__container_type_image">
        <button className="popup__close-button popup__close-button_type_image" type="button" title="Закрыть" onClick={props.onClose}/>
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
        <figcaption className="popup__figcaption">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </section>
  );
};

export default ImagePopup;
