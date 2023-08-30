export class MainApi {
    constructor(options) {
        // constructor body
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInformation() {
        return this._request(this._baseUrl + "/users/me", {
            headers: this._headers,
        });
    }

    getArticles() {
        return this._request(this._baseUrl + "/articles", {
            headers: this._headers,
        });
    }
    addArticle(keyword, title, text, date, source, link, image) {
        return this._request(this._baseUrl + "/articles", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                keyword: keyword,
                title: title,
                text: text,
                date: date,
                source: source,
                link: link,
                image: image,
            }),
        });
    }

    deleteArticle(articleId) {
        return this._request(this._baseUrl + "/articles/" + articleId, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    register(email, password, name) {
        return this._request(this._baseUrl + "/signup", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        });
    }

    login(email, password) {
        return this._request(this._baseUrl + "/signin", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                email,
                password,
            }),
        });
    }

    checkToken(token) {
        this._headers = {...this._headers, authorization: `Bearer ${token}` };
        return this._request(this._baseUrl + "/users/me", {
            method: "GET",
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

const mainApi = new MainApi({
    baseUrl: "https://api.newsexp.mooo.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default mainApi;