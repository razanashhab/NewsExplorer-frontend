export class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getArticles(query) {
    return this._request(`${this._baseUrl}/everything?q='${query}'`, {
      headers: this._headers,
    });
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
  baseUrl: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": "f1911b7605d34b40ad7be2bdd4845d45",
  },
});

export default api;
