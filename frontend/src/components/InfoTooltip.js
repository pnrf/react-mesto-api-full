function InfoTooltip({ image, title, isOpen, onClose, onCloseClick }) {

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onCloseClick}>
      <figure className="popup__container">
        <button className="popup__close-button" type="button" title="Закрыть" onClick={onClose}/>
        <img className="popup__icon" src={image} alt={title}/>
        <figcaption className="popup__icon-caption">{title}</figcaption>
      </figure>
    </section>
  );
};

export default InfoTooltip;
