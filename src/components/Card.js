export class Card {
   constructor(data, templateCard, userId, authorData, actions) {

      this._card = data;
      this._name = this._card.name;
      this._link = this._card.link;
      this._cardOwnerId = this._card.owner._id;
      this._templateCard = templateCard;

      this._userId = userId;
      this._cardId = authorData.cardId;
      this._authorId = authorData.authorId;

      this._likes = this._card.likes;
      this._handleDeleteLike = actions.handleDeleteLike;
      this._handleDeleteClick = actions.handleDeleteClick;
      this._handleSetLike = actions.handleSetLike;
      this._handleViewCard = actions.handleViewCard;
   }

   //шаблон карточки
   _getTemplate() {
      this._card = document
         .querySelector(this._templateCard)
         .content
         .querySelector('.card')
         .cloneNode(true);

      return this._card;
   }

   //удаление карточки
   deleteCard() {
      this._cardTemplate.remove();
      this._cardTemplate = null;
   }

   generateCard() {
      this._cardTemplate = this._getTemplate();

      this._buttonLike = this._cardTemplate.querySelector('.card__button-like');
      this._likesNumber = this._cardTemplate.querySelector('.card__like-counter');
      this._buttonDeleted = this._cardTemplate.querySelector('.card__button-deleted');
      this._cardImage = this._cardTemplate.querySelector('.card__image');

      this._cardTemplate.querySelector('.card__description').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      this._deleteButtonCard();
      this._likedCard();
      this._likesNumber.textContent = this._likes.length;
      this._setEventListeners();

      return this._cardTemplate;
   }

   //проверка лайка на карточке
   _likedCard() {
      if (this._likes.some((user) => {
         return this._userId === user._id;
      })) {
         this._buttonLike.classList.add('card__button-like_active');
      }
   }

   handleLikeCard(data) {
      this._likes = data.likes;
      this._likesNumber.textContent = this._likes.length;
      this._buttonLike.classList.toggle('card__button-like_active');
   }

   _setEventListeners() {
     
      this._buttonLike.addEventListener('click', () => {
         if (this._buttonLike.classList.contains('card__button-like_active')) {
            this._handleDeleteLike(this._cardId);
         } else {
            this._handleSetLike(this._cardId);
         }
      })

      this._cardImage.addEventListener('click', () => this._handleViewCard(this._name, this._link));
      if (this._userId === this._authorId) {
         this._buttonDeleted.addEventListener('click', () => this._handleDeleteClick(this._cardId));
      } else {
         this._buttonDeleted.remove();
      }

   }

   //убираем кнопку удалить
   _deleteButtonCard() {
      if (this._userId !== this._cardOwnerId) {
         this._buttonDeleted.remove();
      }
   }
}
