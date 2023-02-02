const editButtonProfile = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closeButtonPopup = popup.querySelector('.popup__btn-close');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');


function handleEditButtonProfileClick() {
   popup.classList.add('popup_opened')
   nameInput.value = nameProfile.textContent;
   jobInput.value = jobProfile.textContent;
}

function handleCloseButtonPopupClick() {
   popup.classList.remove('popup_opened')
}


editButtonProfile.addEventListener('click', handleEditButtonProfileClick);
closeButtonPopup.addEventListener('click', handleCloseButtonPopupClick);


let formElement = document.querySelector('.popup__form');

function formSubmitHandler(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   nameProfile.textContent = nameInput.value;
   jobProfile.textContent = jobInput.value;

   handleCloseButtonPopupClick();
}

formElement.addEventListener('submit', formSubmitHandler);



/* Прошлая версия 

   const toggleOpenPopup = () => {
   popup.classList.toggle("popup_opened");
   nameInput.value = nameProfile.textContent;
   jobInput.value = jobProfile.textContent;
}

 const handleEditButtonProfileClick = () => {
   toggleOpenPopup();
 }

const handleCloseButtonPopupClick = () => {
  toggleOpenPopup();
 } */
