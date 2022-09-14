function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened': ''}`} onMouseDown={props.onCloseClick}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" title="Закрыть" onClick={props.onClose}/>

        <div className="popup__content">
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__input-list" name={`popup-${props.name}-form`} onSubmit={props.onSubmit}>
            {props.children}
            <button className="popup__save-button" type="submit" title="Сохранить">{props.buttonText}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PopupWithForm;
