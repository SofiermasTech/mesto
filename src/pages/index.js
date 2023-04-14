import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
   validationConfig,
   placeList,
   popupProfileOpenButton,
   popupEdit,
   nameInput,
   jobInput,
   buttonOpenPopupAdd,
   popupAdd,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';


//функция для изображения popup
const handleCardClick = function (link, name) {
   popupViewImage.open(link, name);
}

//создание карточки
const createCard = (cardData) => {
   const card = new Card(cardData, handleCardClick, '#item');
   return card.generateCard();
}

//popup всплывающего изображения
const popupViewImage = new PopupWithImage('.popup-view');
popupViewImage.setEventListeners();

// Получение данных пользователя
const userInfo = new UserInfo({
   author: '.profile__name',
   jobAuthor: '.profile__job'
});

//popup редактирования профиля
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
   profileValidation.resetValidation();
   popupEditProfile.open();

   const info = userInfo.getUserInfo();
   nameInput.value = info.author;
   jobInput.value = info.jobAuthor;
});


const saveCard = new PopupWithForm({
   popupSelector: '.popup-add',
   handleFormSubmit: (formValues) => {
      addStartCard.addItem(createCard({ link: formValues.linkPlace, name: formValues.namePlace }));
      saveCard.close();
   }
});
saveCard.setEventListeners();


// add
buttonOpenPopupAdd.addEventListener('click', () => {
   newCardValidation.toggleButtonState();
   newCardValidation.resetValidation();
   saveCard.open();
});


// NEW Наполнение страницы начальными карточками - OK
const addStartCard = new Section({
   items: placeList,
   renderer: (cardData) => {
      addStartCard.addItem(createCard(cardData));
   },
}, '.cards');

addStartCard.renderItems();


//запуск валидации форм
const profileValidation = new FormValidator(validationConfig, popupEdit);
const newCardValidation = new FormValidator(validationConfig, popupAdd);
profileValidation.enableValidation();
newCardValidation.enableValidation();


