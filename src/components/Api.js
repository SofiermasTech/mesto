export default class Api {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
   }

   _parseResponse(res) {
      if (res.ok) {
         console.log(res);
         return res.json();
      } else {
         return Promise.reject(`код ошибки: ${res.status}`);
      }
   }


   /* Запросы на сервер для карточек */

   //получение 
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      })
         .then(res => { return this._parseResponse(res); });
   }

   //добавление
   addNewCard({ name, link }) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({name, link})
      })
         .then(res => this._parseResponse(res));
   }

   //удаление
   deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
         headers: this._headers,
         method: 'DELETE'
      })
         .then(res => this._parseResponse(res));
   }

   //лайк
   setLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         headers: this._headers,
         method: 'PUT'
      })
         .then(res => this._parseResponse(res));
   }

   //удаляем лайк
   deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(res => this._parseResponse(res));
   }


/* Запросы на сервер для пользователя */

   //информация о пользователе с сервера
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers,
         method: 'GET'
      })
         .then(res => { return this._parseResponse(res); })
   }

   //изменение информации через попап
   editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({
            name: data.author,
            about: data.jobAuthor
         })
      })
         .then(res => this._parseResponse(res));
   }
 
   //редактирование аватара
   editAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({ avatar: data.avatar })
      })
         .then(res => { return this._parseResponse(res) });
   }

}
