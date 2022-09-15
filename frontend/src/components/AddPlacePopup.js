import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isLoading, isOpen, onClose, onCloseClick, onSubmit }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({
      name: name,
      link: link,
    });

    onClose();
  }

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  return(
    <PopupWithForm
      isLoading = {isLoading}
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      onClose={onClose}
      name={'add'}
      form={'placeData'}
      title={'Новое место'}
      buttonText={'Добавить'}
      submitBtnLoading = {'Добавление...'}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input className="popup__input" id="place-name" name="name" type="text" placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleNameChange} required/>
          <span className="popup__input-error" id="place-name-error"/>
        </label>
        <label className="popup__field">
          <input className="popup__input" id="place-link" name="link" type="url" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange} required/>
          <span className="popup__input-error" id="place-link-error"/>
        </label>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
