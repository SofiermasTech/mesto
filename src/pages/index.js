import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
   validationConfig,
   placeList,
   popupProfileOpenButton,
   popupEdit,
   nameInput,
   jobInput,
   buttonOpenPopupAdd,
   popupAdd,
   nameCardPlace,
   linkCardImage
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';


// Заносим данные в форму попапа редактирования профиля
function loadValueEditProfileForm({ author, jobAuthor }) {
   nameInput.value = author;
   jobInput.value = jobAuthor;
};

// Объявление функции для изображения popup
const handleCardClick = function (link, name) {
   popupViewImage.open(link, name);
}

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
   profileValidation.resetValidation();
   loadValueEditProfileForm({
      author: info.author,
      jobAuthor: info.jobAuthor
   });

   popupEditProfile.open();
});


const saveCard = new PopupWithForm({
   popupSelector: '.popup-add',
   handleFormSubmit: () => {
      addStartCard.addItem(createCard({ link: linkCardImage.value, name: nameCardPlace.value },
         handleCardClick, '#item'));
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
      const card = new Card(cardData, handleCardClick, '#item',);
      addStartCard.addItem(card.generateCard());
   },
}, '.cards');

addStartCard.renderItems();


//запуск валидации форм
const profileValidation = new FormValidator(validationConfig, popupEdit);
const newCardValidation = new FormValidator(validationConfig, popupAdd);
profileValidation.enableValidation();
newCardValidation.enableValidation();
