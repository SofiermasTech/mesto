export default class UserInfo {
   constructor({ author, jobAuthor, avatar }) {
      this._author = document.querySelector(author);
      this._jobAuthor = document.querySelector(jobAuthor);
      this._avatar = document.querySelector(avatar);

   }

   getUserInfo() {
      const userInfo = {
         author: this._author.textContent,
         jobAuthor: this._jobAuthor.textContent,
         avatar: this._avatar.src
      }

      return userInfo;
   }

   setUserInfo(data) {
      this._author.textContent = data.name;
      this._jobAuthor.textContent = data.about;
      this._avatar.src = data.avatar;
   }

}

