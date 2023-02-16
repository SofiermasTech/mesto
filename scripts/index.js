const popup = document.querySelector('.popup');
const editButtonProfile = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#item').content;
const popupImageView = document.querySelector('.popup-view');
const popupViewCaption = popupImageView.querySelector('.popup-view__caption');
const popupViewImage = popupImageView.querySelector('.popup-view__image');
const addButtonProfile = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const formElement = document.querySelector('.popup-edit__form');


//Открытие/закрытие popup
const openPopup = function (popup) {
   popup.classList.add('popup_opened');
   
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

//загрузка значений формы
function loadValueForm() {
   nameInput.value = nameProfile.textContent;
   jobInput.value = jobProfile.textContent;
 }

//Первый
editButtonProfile.addEventListener('click', () => {openPopup(popupEdit), loadValueForm()});

//Второй
addButtonProfile.addEventListener('click', () => openPopup(popupAdd));


//Редактирование профиля
function handleProfileFormSubmit(event) {
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

   nameProfile.textContent = nameInput.value;
   jobProfile.textContent = jobInput.value;

   closePopup(popupEdit);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

//Добавление карточки
const addCard = function (place, link) {

   const cloneCardTemplate = cardTemplate.querySelector('.card').cloneNode(true);
   const cardDescriptionPlace = cloneCardTemplate.querySelector('.card__description');
   const cardImagePlace = cloneCardTemplate.querySelector('.card__image');

   cardDescriptionPlace.textContent = place;
   cardImagePlace.src = link;
   cardImagePlace.alt = place;

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

      popupViewCaption.textContent = place;
      popupViewImage.src = link;
      popupViewImage.alt = place;

      openPopup(popupImageView);
   }

   cardImagePlace.addEventListener('click', openPopupView);
   //closeButtonPopupView.addEventListener('click', () => closePopup(popupImageView));

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
const nameCardPlace = popupAdd.querySelector('.popup__input_type_place');
const linkCardImage = popupAdd.querySelector('.popup__input_type_link');
const popupAddForm = popupAdd.querySelector('.popup-add__form');

//Сохранение карточки
const saveCard = function (evt) {
   evt.preventDefault();

   cardsListWrapper.prepend(addCard(nameCardPlace.value, linkCardImage.value));
   evt.target.reset();
   closePopup(popupAdd);
}
//Начальные карточки
const addStartCard = function () {
   placeList.forEach(function (card) {
      cardsListWrapper.append(addCard(card.place, card.link));
   });
}

addStartCard();
popupAddForm.addEventListener('submit', saveCard);



//крестики
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});



