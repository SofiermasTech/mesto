import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(popupSelector) {
     super(popupSelector);
     this._popupImage = document.querySelector('.popup-view__image');
     this._popupCaption = document.querySelector('.popup-view__caption');
   }

   open (link, name) {
      this._popupImage.src = link;
      this._popupCaption.textContent = name;
      this._popupImage.alt = name;
      super.open();
    }
}