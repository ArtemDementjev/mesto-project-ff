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
    .then(res => res.json())
}

export function getInitialCards () {
  return fetch(`${config.baseURL}users/cards`, {
    method: "GET",
    headers: config.headers
    })
    .then(res => res.json())
}