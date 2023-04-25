import Popup from "./Popup.js";

export default class PopupSubmit extends Popup {
   constructor({ popupSelector, handleDeleteCard }) {
      super(popupSelector);
      this._handleDeleteCard = handleDeleteCard;
      this._form = this._popup.querySelector('.popup__form');
   }

   setSubmitCallback(removing) {
      this._handleSubmit = removing;
   }

   // удаление карточки по нажатию на submit
   setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('click', (event) => {
         event.preventDefault();
         this._handleSubmit();
      });
   }
}