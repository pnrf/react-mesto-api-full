// export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://api.pankratov.nomorepartiesxyz.ru';
// export const BASE_URL = 'https://pankratov.nomorepartiesxyz.ru/api';

export function registerUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
}

export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  }).then(checkRes);
}

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}
