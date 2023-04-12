const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popupImageView = document.querySelector('.popup-view');
const popupViewCaption = popupImageView.querySelector('.popup-view__caption');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const nameCardPlace = popupAdd.querySelector('.popup__input_type_place');
const linkCardImage = popupAdd.querySelector('.popup__input_type_link');




export const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible',
};

//6 карточек на старте
export const placeList = [
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      name: 'Карачаевск'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      name: 'Гора Эльбрус'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      name: 'Домбай'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      name: 'Петропавловск-Камчатский'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      name: 'Балтийск'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      name: 'Карелия'
   },
];

export {
   popupProfileOpenButton, popupEdit, nameInput, jobInput, popupImageView, popupViewCaption, buttonOpenPopupAdd,
   popupAdd, nameCardPlace, linkCardImage
}