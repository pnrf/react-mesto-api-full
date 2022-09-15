import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      profile_name: name,
      profile_job: description
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return(
    <PopupWithForm
      isLoading = {props.isLoading}
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      name={'edit'}
      form={'profileData'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
      submitBtnLoading = {'Сохранение...'}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__field">
          <input className="popup__input" id="profile-name" name="profile_name" type="text" placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={handleNameChange} required/>
          <span className="popup__input-error" id="profile-name-error"/>
        </label>
        <label className="popup__field">
          <input className="popup__input" id="profile-description" name="profile_description" type="text" placeholder="О себе" minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required/>
          <span className="popup__input-error" id="profile-description-error"/>
        </label>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
