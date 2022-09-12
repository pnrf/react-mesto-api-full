const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(res.status);
}

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://api.pankratov.nomorepartiesxyz.ru';

const signUp = (email, password) => {
  const requestUrl = BASE_URL + '/signup';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const signIn = (email, password) => {
  const requestUrl = BASE_URL + '/signin';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const signOut = () => {
  const requestUrl = BASE_URL + '/singout';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    }).then(checkResponse);
}

// const checkToken = (token) => {
//   const requestUrl = BASE_URL + '/users/me';
//   return fetch(requestUrl, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     credentials: 'include',
//   }).then(checkResponse);
// }

const checkCookies = () => {
  const requestUrl = BASE_URL + '/check';
  return fetch(requestUrl, {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
    credentials: 'include',
    }).then(checkResponse);
}

export {signUp, signIn, signOut, checkCookies};
