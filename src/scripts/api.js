const config = {
  baseURL: 'https://nomoreparties.co/v1/wff-cohort-16/',
  headers: {
    authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
    'Content-Type': 'application/json'
  }
};

export function getAccountInfo () {
  return fetch(`${config.baseURL}users/me`, {
    method: "GET",
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function getInitialCards () {
  return fetch(`${config.baseURL}cards`, {
    method: "GET",
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function postCard(newPlaceName, newPlaceLink) {
  return fetch(`${config.baseURL}cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${newPlaceName.value}`,
      link: `${newPlaceLink.value}`
    })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function patchAvatar(newLink) {
  return fetch(`${config.baseURL}users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${newLink}`
    })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function patchProfileInfo(profileName, profileAbout) {
  return fetch(`${config.baseURL}users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileAbout}`
    })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteCardFromServer(cardID) {
  return fetch(`${config.baseURL}cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteLike(cardID) {
  return fetch(`${config.baseURL}cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function putLike(cardID) {
  return fetch(`${config.baseURL}cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}