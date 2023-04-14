import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
      //console.log(this._handleFormSubmit);
   }

   _getInputValues() {
      
      const formValues = {};

      this._inputList.forEach(inputItem => {
         formValues[inputItem.name] = inputItem.value;
      })
      
      return formValues;
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
}
