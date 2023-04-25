export default class UserInfo {
   constructor({ author, jobAuthor, avatar }) {
      this._author = document.querySelector(author);
      this._jobAuthor = document.querySelector(jobAuthor);
      this._avatar = document.querySelector(avatar);
      this._userId = '';
   }

   getUserInfo() {
      const userInfo = {
         author: this._author.textContent,
         jobAuthor: this._jobAuthor.textContent,
         avatar: this._avatar.src
      }

      return userInfo;
   }

   setUserInfo({ name, about, avatar, _id }) {
      this._author.textContent = name;
      this._jobAuthor.textContent = about;
      this._avatar.src = avatar;
      this._userId = _id;
   }

}

