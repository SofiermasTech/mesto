
import { popupViewCaption, popupViewImage, openPopup, popupImageView } from './index.js';

export class Card {
   constructor(link, name, templateCard) {
      this._link = link;
      this._name = name;
      this._templateCard = templateCard;
   }


   generateCard() {
      this._cardTemplate = document.querySelector(this._templateCard).content
         .querySelector('.card').cloneNode(true);

      this._buttonLike = this._cardTemplate.querySelector('.card__button-like');
      this._buttonDeleted = this._cardTemplate.querySelector('.card__button-deleted');
      this._cardDescription = this._cardTemplate.querySelector('.card__description');
      this._cardImage = this._cardTemplate.querySelector('.card__image');
      //this._element = this._getTemplate();
      

      this._cardImage.src = this._link;
      this._cardDescription.textContent = this._name;
      this._cardImage.alt = this._name;

      this._setEventListeners();
      return this._cardTemplate;
   }
  

   //метод лайка
   _handleLikeCard() {
      //const buttonLike = this._element.querySelector('.card__button-like');
      this._buttonLike.classList.toggle('card__button-like_active');
   }

   //метод удалить
   _handleDeleteCard() {
      this._cardTemplate.remove();
      this._cardTemplate = null;
   }

   //метод увеличения изображения
   _openPopupView() {
      popupViewCaption.textContent = this._name;
      popupViewImage.src = this._link;
      popupViewImage.alt = this._name;

      openPopup(popupImageView);
   }

   //слушатели лайка, удаления, увеличеения
   _setEventListeners() {

      this._buttonLike.addEventListener('click', () => {
         this._handleLikeCard();
      })

      this._buttonDeleted.addEventListener('click', () => {
         this._handleDeleteCard();
      })

      this._cardImage.addEventListener('click', () => {
         this._openPopupView();
      })
   }

  
}

//console.log(this._templateCard);
