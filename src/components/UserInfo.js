export default class UserInfo {
   constructor({ author, jobAuthor }) {
      this._author = document.querySelector(author);
      this._jobAuthor = document.querySelector(jobAuthor);
   }

   getUserInfo() {
      this._userInfo = {};
      return {
         author: this._author.textContent,
         jobAuthor: this._jobAuthor.textContent
      };
   }

   setUserInfo({ author, jobAuthor }) {
      this._author.textContent = author;
      this._jobAuthor.textContent = jobAuthor;
   }

}

