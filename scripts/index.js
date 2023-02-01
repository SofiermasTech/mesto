const editButtonProfile = document.querySelector('.button_edit-profile');
const popup = document.querySelector('.popup');
const closeButtonPopup = popup.querySelector('.button_popup-close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_job'); 
let nameProfile = document.querySelector('.profile__name'); 
let jobProfile = document.querySelector('.profile__job');


const toggleOpenPopup = () => {
   popup.classList.toggle("popup_opened");
}

const handleEditButtonProfileClick = () => {
   toggleOpenPopup();
}

const handleCloseButtonPopupClick = () => {
   toggleOpenPopup();
}

const handleOverlayClick = (event) => {
   if (event.target === event.currentTarget)

      toggleOpenPopup();
}

editButtonProfile.addEventListener('click', handleEditButtonProfileClick);
closeButtonPopup.addEventListener('click', handleCloseButtonPopupClick);
popup.addEventListener('click', handleOverlayClick);


function formSubmitHandler(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   // nameInput.getAttribute('value');
   // jobInput.getAttribute('value');
   // Получите значение полей из свойства value

   nameProfile.textContent = nameInput.value;
   jobProfile.textContent = jobInput.value;

   handleCloseButtonPopupClick();
}

formElement.addEventListener('submit', formSubmitHandler);




