
//import { popupViewCaption, popupViewImage, openPopup, popupImageView } from '../pages/index.js';

export class Card {
   constructor(data, handleCardClick, templateCard ) {
      this._link = data.link;
      this._name = data.name;
      this._templateCard = templateCard;
      this._handleCardClick = handleCardClick;    
   }

   generateCard() {
      this._cardTemplate = document.querySelector(this._templateCard).content
         .querySelector('.card').cloneNode(true);

      this._buttonLike = this._cardTemplate.querySelector('.card__button-like');
      this._buttonDeleted = this._cardTemplate.querySelector('.card__button-deleted');
      this._cardDescription = this._cardTemplate.querySelector('.card__description');
      this._cardImage = this._cardTemplate.querySelector('.card__image');
     
      this._cardImage.src = this._link;
      this._cardDescription.textContent = this._name;
      this._cardImage.alt = this._name;

      this._setEventListeners();
      return this._cardTemplate;
   }


   //метод лайка
   _handleLikeCard() {
      this._buttonLike.classList.toggle('card__button-like_active');
   }

   //метод удалить
   _handleDeleteCard() {
      this._cardTemplate.remove();
      this._cardTemplate = null;
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
         this._handleCardClick(this._link, this._name);
      })
   }


}

//console.log();
