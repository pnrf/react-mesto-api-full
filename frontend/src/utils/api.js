class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.profile_name,
        about: data.profile_job,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addNewCard(user) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: user.name,
        link: user.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  removeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  addCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  updateProfileAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.pankratov.nomorepartiesxyz.ru',
  // baseUrl: 'https://pankratov.nomorepartiesxyz.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
