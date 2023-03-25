
import { popupViewCaption, popupViewImage, openPopup, popupImageView } from './index.js';

export class Card {
   constructor(link, place, templateCard) {
      this._link = link;
      this._place = place;
      this._templateCard = templateCard;
   }

   //возвращаем разметку
   _getTemplate() {
      const cardTemplate = document.querySelector('#item').content
         .querySelector('.card').cloneNode(true);

      return cardTemplate;
   }


   //метод лайка
   _handleLikeCard() {
      const buttonLike = this._element.querySelector('.card__button-like');
      buttonLike.classList.toggle('card__button-like_active');
   }

   //метод удалить
   _handleDeleteCard() {
      this._element.remove();
      this._element = null;
   }

   //метод увеличения изображения
   _openPopupView() {
      popupViewCaption.textContent = this._place;
      popupViewImage.src = this._link;
      popupViewImage.alt = this._place;

      openPopup(popupImageView);
   }

   //слушатели лайка, удаления, увеличеения
   _setEventListeners() {

      this._element.querySelector('.card__button-like').addEventListener('click', () => {
         this._handleLikeCard();
      })

      this._element.querySelector('.card__button-deleted').addEventListener('click', () => {
         this._handleDeleteCard();
      })

      this._element.querySelector('.card__image').addEventListener('click', () => {
         this._openPopupView();
      })
   }


   generateCard() {
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector('.card__image').src = this._link;
      this._element.querySelector('.card__description').textContent = this._place;
      this._element.querySelector('.card__image').alt = this._place;

      return this._element;
   }
}

//console.log(this._templateCard);
