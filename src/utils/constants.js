const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupImageView = document.querySelector('.popup-view');
const popupViewCaption = popupImageView.querySelector('.popup-view__caption');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add__form');
const popupAvatar = document.querySelector('.popup-avatar');
const formAvatar = popupAvatar.querySelector('.popup-avatar__form');
const buttonEditAvatar = document.querySelector('.profile__button-avatar');
const avatar = document.querySelector('.profile__avatar');



export const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible',
};

export {
   popupProfileOpenButton, popupEdit, nameInput, jobInput, popupImageView, popupViewCaption, buttonOpenPopupAdd,
   popupAdd, formAvatar, buttonEditAvatar, avatar,
}