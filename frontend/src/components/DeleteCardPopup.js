import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, isOpen, onClose, onCloseClick, onSubmit }) {
  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      onClose={onClose}
      name={'delete'}
      title={'Вы уверены?'}
      buttonText={'Да'}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
