const editButtonProfile = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const closeButtonPopupEdit = popupEdit.querySelector('.popup-edit__btn-close');
let nameInput = document.querySelector('.popup-edit__input_type_name');
let jobInput = document.querySelector('.popup-edit__input_type_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

//Первый попап. Открытие/закрытие
function handleEditButtonProfileClick() {
   popupEdit.classList.add('popup-edit_opened')
   nameInput.value = nameProfile.textContent;
   jobInput.value = jobProfile.textContent;
}

function handleCloseButtonPopupClick() {
   popupEdit.classList.remove('popup-edit_opened');
}

editButtonProfile.addEventListener('click', handleEditButtonProfileClick);
closeButtonPopupEdit.addEventListener('click', handleCloseButtonPopupClick);

//Редактирование профиля
let formElement = document.querySelector('.popup-edit__form');

function formSubmitHandler(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   nameProfile.textContent = nameInput.value;
   jobProfile.textContent = jobInput.value;

   handleCloseButtonPopupClick();
}

formElement.addEventListener('submit', formSubmitHandler);

//Второй попап. Открытие/закрытие
const addButtonProfile = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const closeButtonPopupAdd = popupAdd.querySelector('.popup-add__btn-close');

function handleAddButtonClick() {
   popupAdd.classList.add('popup-add_opened');
}

function handleCloseButtonClick() {
   popupAdd.classList.remove('popup-add_opened');
}

addButtonProfile.addEventListener('click', handleAddButtonClick);
closeButtonPopupAdd.addEventListener('click', handleCloseButtonClick);

//Третий попап. Открытие/закрытие
const popupImageView = document.querySelector('.popup-view');
const closeButtonPopupView = document.querySelector('.popup-view__btn-close');

function handleOpenCard() {
   popupImageView.classList.add('popup-view_opened');
}

function handleCloseCard() {
   popupImageView.classList.remove('popup-view_opened');
}


//Добавление карточки
const addCard = function (place, link) {
  const cardTemplate = document.querySelector('#item').content;
  const cloneCardTemplate = cardTemplate.querySelector('.card').cloneNode(true);
  
  
  cloneCardTemplate.querySelector('.card__description').textContent = place;
  cloneCardTemplate.querySelector('.card__image').src = link;
  
  //Лайк
  cloneCardTemplate.querySelector('.card__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });

  //Удаление
  cloneCardTemplate.querySelector('.card__button-deleted').addEventListener('click', function (evt) {
   evt.target.closest('.card').remove();
  });


  //Открытие фото
  const openPopupView = function () {
   
   popupImageView.querySelector('.popup-view__caption').textContent = place;
   popupImageView.querySelector('.popup-view__image').src = link;
    
   handleOpenCard(popupImageView); 
  }

  cloneCardTemplate.querySelector('.card__image').addEventListener('click', openPopupView);
  closeButtonPopupView.addEventListener('click', handleCloseCard);
    
  return cloneCardTemplate;
}


//6 карточек на старте
const placeList = [
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      place: 'Карачаевск'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      place: 'Гора Эльбрус'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      place: 'Домбай'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      place: 'Петропавловск-Камчатский'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      place: 'Балтийск'
   },
   {
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      place: 'Карелия'
   },
];

const cardsListWrapper = document.querySelector('.cards');
const nameCardPlace = popupAdd.querySelector('.popup-add__input_type_place');
const linkCardImage = popupAdd.querySelector('.popup-add__input_type_link');

//Сохранение карточки
const saveCard = function (evt) {
  evt.preventDefault();

  cardsListWrapper.prepend(addCard(nameCardPlace.value, linkCardImage.value));
  evt.target.reset();
  handleCloseButtonClick(popupAdd);
}
//Начальные карточки
const addStartCard = function () {
   placeList.forEach(function (card) {
      cardsListWrapper.append(addCard(card.place, card.link));
  });
}

addStartCard();
popupAdd.addEventListener('submit', saveCard);




