import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
   validationConfig,
   popupProfileOpenButton,
   popupEdit,
   nameInput,
   jobInput,
   buttonOpenPopupAdd,
   popupAdd,
   formAvatar,
   buttonEditAvatar,
   avatar,

} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupSubmit from '../components/PopupSubmit.js';
import './index.css';


/* -------------- API ------------------*/

const api = new Api({
   url: 'https://mesto.nomoreparties.co/v1/cohort-64',
   headers: {
      authorization: '4540ef64-f0c3-404e-8fd0-3e3d77e1eef2',
      'Content-Type': 'application/json'
   }

});

let userId;

//загрузка данных
Promise.all([api.getInitialCards(), api.getUserInfo()])
   .then(([initialCards, userData]) => {
      userInfo.setUserInfo(userData);
      userId = userData._id;
      addStartCard.renderItems(initialCards);
   })
   .catch((err) => {
      console.log(`Возникла ошибка: ${err}`);
   });



/* -------------- user ------------------*/

//получение данных
const userInfo = new UserInfo({
   author: '.profile__name',
   jobAuthor: '.profile__job',
   avatar: '.profile__avatar'
});

//Popup редактирования аватара пользователя
const popupAvatarProfile = new PopupWithForm({
   popupSelector: '.popup-avatar',
   handleFormSubmit: (data) => {
      popupAvatarProfile.loading(true);
      api.editAvatar(data)
         .then((data) => {
            avatar.src = data.avatar;
            popupAvatarProfile.close();
         })
         .catch((err) => { console.log(err); })
         .finally(() => { popupAvatarProfile.loading(false); });
   }
});

popupAvatarProfile.setEventListeners();

//слушатель кнопки аватара
buttonEditAvatar.addEventListener('click', () => {
   popupAvatarProfile.open();
   avatarValidator.resetValidation();
   avatarValidator.toggleButtonState();

});


//Popup редактирования профиля
const popupEditProfile = new PopupWithForm({
   popupSelector: '.popup-edit',

   handleFormSubmit: (dataForm) => {
      popupEditProfile.loading(true);
      api.editUserInfo(dataForm)
         .then((dataForm) => {
            userInfo.setUserInfo(dataForm);
            popupEditProfile.close();
         })
         .catch((err) => { console.log(`Возникла ошибка: ${err}`); })
         .finally(() => { popupEditProfile.loading(false); });
   }
});

popupEditProfile.setEventListeners();

//слушатель кнопки редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
   profileValidation.resetValidation();

   const info = userInfo.getUserInfo();
   nameInput.value = info.author;
   jobInput.value = info.jobAuthor;

   popupEditProfile.open();
});


/* -------------- card ------------------*/

//создание карточки
const createCard = function (data) {
   const renderCard = new Card(data, '#item', userId, { cardId: data._id, authorId: data.owner._id }, {
      
      //увеличение изображения
      handleViewCard: (name, link) => { popupViewImage.open(name, link) },
      
      //удаление карточки
      handleDeleteClick: (cardId) => {
         popupDeleteCard.open();
         popupDeleteCard.submitCallback(() => {
            api.deleteCard(cardId)
               .then(() => { popupDeleteCard.close(); renderCard.deleteCard(); })
               .catch((err) => { console.log(`Возникла ошибка: ${err}`); });
         });
      },

      //лайк
      handleSetLike: (cardId) => { api.setLike(cardId)
         .then((data) => { renderCard.handleLikeCard(data); })
         .catch((err) => { console.log(`Возникла ошибка: ${err}`);
         })
      },

      //удаление лайка
      handleDeleteLike: (cardId) => {
         api.deleteLike(cardId)
            .then((data) => { renderCard.handleLikeCard(data); })
            .catch((err) => { console.log(`Возникла ошибка: ${err}`);
            })
      },
   });

   return renderCard.generateCard();
}

//начальные карточки
const addStartCard = new Section({
   renderer: (cardData) => {
      addStartCard.addItem(createCard(cardData));
   },
}, '.cards');


//Popup with new card
const saveCard = new PopupWithForm({
   popupSelector: '.popup-add',
   handleFormSubmit: (formValues) => {
      saveCard.loading('Сохранение...');
      api.addNewCard({ name: formValues.namePlace, link: formValues.linkPlace })
         .then((formValues) => { addStartCard.addItem(createCard(formValues)); saveCard.close();
         })
         .catch((err) => { console.log(`Возникла ошибка: ${err}`);
         })
         .finally(() => { saveCard.loading(false);
         })
   }
});

saveCard.setEventListeners();

//слушатель add
buttonOpenPopupAdd.addEventListener('click', () => {
   newCardValidation.toggleButtonState();
   newCardValidation.resetValidation();
   saveCard.open();
});

//Popup удаления карточки
const popupDeleteCard = new PopupSubmit({
   popupSelector: '.popup-delete'
});

popupDeleteCard.setEventListeners();

//Popup увеличения изображения
const popupViewImage = new PopupWithImage('.popup-view');
popupViewImage.setEventListeners();


/* -------------- validation ------------------*/
const profileValidation = new FormValidator(validationConfig, popupEdit);
const newCardValidation = new FormValidator(validationConfig, popupAdd);
const avatarValidator = new FormValidator(validationConfig, formAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidator.enableValidation();

