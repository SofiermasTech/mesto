import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
      this._submitButton = this._popupForm.querySelector('.popup__submit');
      this._submitButtonText = this._submitButton.textContent;
      // console.log(this._handleFormSubmit);
   }

   _getInputValues() {

      this._formValues = {};

      this._inputList.forEach(inputItem => {
         this._formValues[inputItem.name] = inputItem.value;
      })
      //console.log(formValues);
      return this._formValues;
   }



   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {
         evt.preventDefault();

         this._handleFormSubmit(this._getInputValues());
      })
   }


   close() {
      super.close();
      this._popupForm.reset();
   }

   //изменение текста кнопки при загрузке
   loading(isLoading) {
      if (isLoading) {
         this._submitButton.textContent = 'Сохранение...'
      } else {
         this._submitButton.textContent = this._submitButtonText;
      }
   }
}
