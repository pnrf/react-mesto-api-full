function InfoTooltip(props) {

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
      <figure className="popup__container">
        <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}/>
        <img className="popup__icon" src={props.image} alt={props.title}/>
        <figcaption className="popup__icon-caption">{props.title}</figcaption>
      </figure>
    </section>
  );
};

export default InfoTooltip;
