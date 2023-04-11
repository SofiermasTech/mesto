import  Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, placeList } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
export const popupImageView = document.querySelector('.popup-view');
export const popupViewCaption = popupImageView.querySelector('.popup-view__caption');
//export const popupViewImage = popupImageView.querySelector('.popup-view__image');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const formProfileElelement = document.querySelector('.popup-edit__form');
const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupAll = document.querySelectorAll('.popup');
const cardsListWrapper = document.querySelector('.cards');
const nameCardPlace = popupAdd.querySelector('.popup__input_type_place');
const linkCardImage = popupAdd.querySelector('.popup__input_type_link');
const popupAddForm = popupAdd.querySelector('.popup-add__form');


// Заносим данные в форму попапа редактирования профиля
function loadValueEditProfileForm({ author, jobAuthor }) {
   nameInput.value = author;
   jobInput.value = jobAuthor;
 };

 // Объявление функции для popup всплывающего изображения ( нужна по ТЗ )
const handleCardClick = function (link, name) {
   popupViewImage.open(link, name);
 }

/*
 // Объявление функции для добавления карточки
 const createCard = (data) => {
   const renderCard = new Card({data: data, handleCardClick: (link, name) => {
   popupViewImage.open(link, name);
   }}, '#item');

   return renderCard.generateCard();
 }
 */
//создание карточки
const createCard = (cardData) => {
   const renderCard = new Card(cardData, handleCardClick, '#item');
   return renderCard.generateCard();
}

// Объявление popup всплывающего изображения
const popupViewImage = new PopupWithImage('.popup-view');
popupViewImage.setEventListeners();

// Получение данных пользователя
const userInfo = new UserInfo({
   author: '.profile__name',
   jobAuthor: '.profile__job'
});


/* Функции */


// Объявление popup редактирования профиля
const popupEditProfile = new PopupWithForm({
   popupSelector: '.popup-edit',
   
   handleFormSubmit: (item) => {
      userInfo.setUserInfo({
         author: item.author,
         jobAuthor: item.jobAuthor
       });
      popupEditProfile.close();
    }

});
popupEditProfile.setEventListeners();


// Слушатель на иконку редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
   const info = userInfo.getUserInfo();
   loadValueEditProfileForm({
  author: info.author,
  jobAuthor: info.jobAuthor
   });
   popupEditProfile.open();
  // nameInput.setAttribute('value', userInfo.getUserInfo().author);
  // jobInput.setAttribute('value', userInfo.getUserInfo().job);
 });


 const saveCard = new PopupWithForm({popupSelector: '.popup-add', 
 handleFormSubmit: () => {
      addStartCard.addItem(createCard({link: linkCardImage.value, name: nameCardPlace.value}, 
         handleCardClick, '#item'));
     saveCard.close();
   }

  
 });
 saveCard.setEventListeners();

 

// add
buttonOpenPopupAdd.addEventListener('click', () => {
   saveCard.open();
   newCardValidation.toggleButtonState();
 });


 // NEW Наполнение страницы начальными карточками - OK
const addStartCard = new Section({
   items: placeList,
   renderer: (cardData) => {
      const card = new Card(cardData, handleCardClick, '#item',);
      addStartCard.addItem(card.generateCard());
   },
}, '.cards');

addStartCard.renderItems();

/*

// Наполнение страницы начальными карточками
const renderInitialCards = new Section({
   items: objectListCard,
   renderer: (cardData) => {
     const card = new Card(cardData, '#card-template', handleCardClick);
     renderInitialCards.addItem(card.makeCard());
   }
 }, '.cards');
 renderInitialCards.renderItems();

*/
 

 
//console.log(userInfo);


//запуск валидации форм
const profileValidation = new FormValidator(validationConfig, popupEdit);
const newCardValidation = new FormValidator(validationConfig, popupAdd);
profileValidation.enableValidation();
newCardValidation.enableValidation();
