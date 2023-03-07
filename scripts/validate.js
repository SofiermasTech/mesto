// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible',
};

// Показ, скрытие ошибок валидации
const showInputError = function (formElement, inputElement, errorMessage) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
   inputElement.classList.add(enableValidation.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(enableValidation.errorClass);
};


const hideInputError = function (formElement, inputElement) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
   inputElement.classList.remove(enableValidation.inputErrorClass);
   errorElement.classList.remove(enableValidation.errorClass);
   errorElement.textContent = '';
};

// Проверка форм
const checkInputValidity = function (formElement, inputElement) {
   if (inputElement.validity.valid === false) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
      hideInputError(formElement, inputElement);
   }
};


const setEventListeners = function (formElement) {
   const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
   const buttontElement = formElement.querySelector(enableValidation.submitButtonSelector);
   toggleButtonState(inputList, buttontElement);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
         toggleButtonState(inputList, buttontElement);
      });
   });
}


const hasInvalidInput = function (inputList) {
   return inputList.some((item) => {
      return !item.validity.valid;
   });
}


const enableValidationCheck = function () {
   const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
         evt.preventDefault();
      });
      setEventListeners(formElement);
   });
}


const toggleButtonState = function (inputList, buttontElement) {
   if (hasInvalidInput(inputList)) {
      buttontElement.classList.add(enableValidation.inactiveButtonClass);
   } else {
      buttontElement.classList.remove(enableValidation.inactiveButtonClass);
   }
}


enableValidationCheck(enableValidation);
