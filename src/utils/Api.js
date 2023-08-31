export class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getArticles(query) {
    return this._request(
      `${this._baseUrl}?q='${query}'&apiKey=f1911b7605d34b40ad7be2bdd4845d45`
    );
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
});

export default api;
