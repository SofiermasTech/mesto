import { Card } from './Card.js';
import { FormValidator } from './formValidator.js';
import {validationConfig, placeList} from './constList.js';


const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
//const cardTemplate = document.querySelector('#item').content; 
export const popupImageView = document.querySelector('.popup-view');
export const popupViewCaption = popupImageView.querySelector('.popup-view__caption'); 
export const popupViewImage = popupImageView.querySelector('.popup-view__image'); 
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const formProfileElelement = document.querySelector('.popup-edit__form');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupAll = document.querySelectorAll('.popup');
const cardsListWrapper = document.querySelector('.cards');
const nameCardPlace = popupAdd.querySelector('.popup__input_type_place');
const linkCardImage = popupAdd.querySelector('.popup__input_type_link');
const popupAddForm = popupAdd.querySelector('.popup-add__form');



//Открытие/закрытие popup 
export const openPopup = function (popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupEsc)
}

export function closePopup(popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupEsc);
}

// ESC
const closePopupEsc = function (evt) {
   if (evt.key === 'Escape') {
      const popupVisible = document.querySelector('.popup_opened')
      closePopup(popupVisible);
   }
}

//Закрытие по overlay 
popupAll.forEach((popupElement) => {
   popupElement.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
         closePopup(popupElement);
      }
   });
});

//загрузка значений формы
function loadValueEditProfileForm() {
   nameInput.value = nameProfile.textContent;
   jobInput.value = jobProfile.textContent;
}

//Первый
popupProfileOpenButton.addEventListener('click', () => { openPopup(popupEdit), loadValueEditProfileForm() });
//Второй
buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAdd));


//Редактирование профиля
function handleProfileFormSubmit(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   nameProfile.textContent = nameInput.value;
   jobProfile.textContent = jobInput.value;

   closePopup(popupEdit);
}

formProfileElelement.addEventListener('submit', handleProfileFormSubmit);

//крестики
buttonClosePopup.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});



//сохранение карточки
const saveCard = function (evt) {
   evt.preventDefault();

   cardsListWrapper.prepend(new Card(linkCardImage.value, nameCardPlace.value, '#item').generateCard());
   evt.target.reset();
   closePopup(popupAdd); 

   const buttonSubmit = popupAdd.querySelector('.popup-add__btn-submit');
   buttonSubmit.classList.add('popup__submit_disabled');
   buttonSubmit.setAttribute('disabled', true);

   new FormValidator(validationConfig, popupAddForm).enableValidation();
}

popupAddForm.addEventListener('submit', saveCard);
//console.log();

//начальные карточки 
const addStartCard = function () {
   placeList.forEach(function (card) {
      cardsListWrapper.append(new Card(card.link, card.place, '#item').generateCard());
   });
}


//валидации элементов
const renderValidationCards = function () {
   document.querySelectorAll(validationConfig.formSelector).forEach(formElement => {
      new FormValidator(validationConfig, formElement).enableValidation();
   })
}

addStartCard();
renderValidationCards();
