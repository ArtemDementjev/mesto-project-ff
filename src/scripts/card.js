export const cardFunctions = {
  createCard,
  deleteCard,
  likeCard
};

function createCard(cardTemplate, cardObject, functions, popupFunction, profileObject) {
  const cardElement = getCardTemplate(cardTemplate);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const heartButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesQuantity = cardElement.querySelector('.likes-quantity');
  likesQuantity.innerText = cardObject.likes.length;
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardElement.querySelector('.card__title').textContent = cardObject.name;
  deleteButton.addEventListener('click', () => functions.deleteCard(cardElement, cardObject));
  heartButton.addEventListener('click', () => functions.likeCard(heartButton, cardObject, likesQuantity));
  cardImage.addEventListener('click', (evt) => popupFunction(evt));
  if (!(profileObject['_id'] === cardObject['owner']['_id'])) {
    deleteButton.style.display = 'none';
  }
  if (cardObject.likes.some((object) => {
    return object._id === '0aaf1539537bfb94e4b997f9';
})) {
    heartButton.classList.add('card__like-button_is-active');
  }
  return cardElement;
};

function deleteCard(card, cardObject) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/${cardObject._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
      'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      card.remove()
    });
};

function likeCard(heartButton, cardObject, likesQuantity) {
  if (heartButton.classList.value.includes('card__like-button_is-active')) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardObject._id}`, {
      method: 'DELETE',
      headers: {
        authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        heartButton.classList.toggle('card__like-button_is-active');
        likesQuantity.innerText = result.likes.length;
      });
  } else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardObject._id}`, {
      method: 'PUT',
      headers: {
        authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
        'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        heartButton.classList.toggle('card__like-button_is-active');
        likesQuantity.innerText = result.likes.length;
      });
  }
};

function getCardTemplate(cardTemplate) {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
};