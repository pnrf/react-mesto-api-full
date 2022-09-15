function PopupWithForm({ children, isLoading, isOpen, onCloseClick, onClose, onSubmit, name, title, buttonText, submitBtnLoading }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened': ''}`} onMouseDown={onCloseClick}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" title="Закрыть" onClick={onClose}/>

        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form className="popup__input-list" name={`popup-${name}-form`} onSubmit={onSubmit}>
            {children}
            <button className="popup__save-button" type="submit" title="Сохранить">{isLoading ? submitBtnLoading : buttonText}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PopupWithForm;
