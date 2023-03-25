
export class FormValidator {
   constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
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
      const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

      this._toggleButtonState();

      inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
         });
      });
   }


   _hasInvalidInput() {
      return Array.from(this._formElement.querySelectorAll(this._config.inputSelector)).some((inputElement) => {
         return !inputElement.validity.valid;
      });
   }


   enableValidation() {
      const formList = Array.from(document.querySelectorAll(this._config.formSelector));
      formList.forEach((formElement) => {
         this._setEventListeners(formElement);
      });
   }


   //метод активации submit валидации
   _toggleButtonState() {
      if (this._hasInvalidInput()) {

         this._buttonElement.setAttribute('disabled', 'true');
         this._buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {

         this._buttonElement.classList.remove(this._config.inactiveButtonClass);
         this._buttonElement.removeAttribute('disabled');
      }
   }
}


