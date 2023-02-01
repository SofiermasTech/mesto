const editButtonPopup = document.querySelector('.button__edit_type_active');
const popup = document.querySelector('.popup');
const closeButtonPopup = popup.querySelector('.button__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__description'); // Воспользуйтесь инструментом .querySelector()
let nameInput11 = document.querySelector('.profile__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput11 = document.querySelector('.input__description');

const toggleOpenPopup = () => {
   popup.classList.toggle("popup_opened");
};

const handleEditButtonPopupClick = () => {
   toggleOpenPopup();
}

const handleCloseButtonPopupClick = () => {
   //nameInput.value = nameInput11.textContent;
  //jobInput.value = nameInput11.textContent;
   toggleOpenPopup();
}

const handleOverlayClick = (event) => {
   if (event.target === event.currentTarget)

      toggleOpenPopup();
}

editButtonPopup.addEventListener('click', handleEditButtonPopupClick);
closeButtonPopup.addEventListener('click', handleCloseButtonPopupClick);
popup.addEventListener('click', handleOverlayClick);






function formSubmitHandler(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.



   //nameInput.getAttribute('value');
   //jobInput.getAttribute('value');
   // Получите значение полей из свойства value

   // Выберите элементы, куда должны быть вставлены значения полей
   nameInput11.textContent = nameInput.value;
   jobInput11.textContent = jobInput.value;
   // Вставьте новые значения с помощью textContent

   handleCloseButtonPopupClick();
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);




