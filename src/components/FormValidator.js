
export class FormValidator {
   constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      //submit кнопка в форме
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
   }

   //добавление ошибки
   _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
   };

   //удаление ошибки
   _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
   };


   //проверка форм
   _checkInputValidity(inputElement) {
      if (inputElement.validity.valid === false) {
         this._showInputError(inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(inputElement);
      }
   };

   //метод проверки всех input
   _setEventListeners() {
      this.toggleButtonState();

      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
         });
      });
   }


   _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   }


   enableValidation() {
      this._setEventListeners();
   }


   //метод активации submit валидации
   toggleButtonState() {
      if (this._hasInvalidInput()) {

         this._buttonElement.setAttribute('disabled', 'true');
         this._buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {

         this._buttonElement.classList.remove(this._config.inactiveButtonClass);
         this._buttonElement.removeAttribute('disabled');
      }
   }
}


