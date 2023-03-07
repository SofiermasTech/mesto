// включение валидации вызовом validationConfig
// все настройки передаются при вызове

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible',
};

// Показ, скрытие ошибок валидации
const showInputError = function (formElement, inputElement, errorMessage, config) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
   inputElement.classList.add(config.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(config.errorClass);
};


const hideInputError = function (formElement, inputElement, config) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
   inputElement.classList.remove(config.inputErrorClass);
   errorElement.classList.remove(config.errorClass);
   errorElement.textContent = '';
};

// Проверка форм
const checkInputValidity = function (formElement, inputElement, config) {
   if (inputElement.validity.valid === false) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
   } else {
      hideInputError(formElement, inputElement, config);
   }
};


const setEventListeners = function (formElement, config) {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);
   toggleButtonState(inputList, buttonElement, config);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement, config);
         toggleButtonState(inputList, buttonElement, config);
      });
   });
}


const hasInvalidInput = function (inputList) {
   return inputList.some((item) => {
      return !item.validity.valid;
   });
}


const enableValidation = function (config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
         evt.preventDefault();
      });
      setEventListeners(formElement, config);
   });

}


const toggleButtonState = function (inputList, buttonElement, config) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
   } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}


enableValidation(validationConfig);
