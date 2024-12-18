import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isLoading, isOpen, onClose, onCloseClick, onSubmit }) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({
      avatar: ref.current.value
    });
  }

  React.useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm
      isLoading = {isLoading}
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      onClose={onClose}
      name={'avatar'}
      form={'placeData'}
      title={'Обновить аватар'}
      buttonText={'Обновить'}
      submitBtnLoading = {'Обновление...'}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input ref={ref} className="popup__input" id="avatar-link" name="avatar_link" type="url" placeholder="Ссылка на аватар" required/>
        <span className="popup__input-error" id="avatar-link-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
