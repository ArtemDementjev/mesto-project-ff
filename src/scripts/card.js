export const cardFunctions = {
  createCard,
  deleteCard,
  likeCard
};

import {deleteCardFromServer, deleteLike, putLike} from './api';

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
  // deleteButton.addEventListener('click', () => functions.deleteCard(cardElement, cardObject));
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
  cardElement.setAttribute('id', cardObject._id);
  return cardElement;
};

function deleteCard(card) {
  deleteCardFromServer(card.id)
    .then(() => {
      card.remove()
    })
    .catch((err) => console.log(err))
};

function likeCard(heartButton, cardObject, likesQuantity) {
  if (heartButton.classList.value.includes('card__like-button_is-active')) {
    deleteLike(cardObject._id)
      .then((result) => {
        heartButton.classList.toggle('card__like-button_is-active');
        likesQuantity.innerText = result.likes.length;
      })
      .catch((err) => console.log(err))
  } else {
    putLike(cardObject._id)
      .then((result) => {
        heartButton.classList.toggle('card__like-button_is-active');
        likesQuantity.innerText = result.likes.length;
      })
      .catch((err) => console.log(err))
  }
};

function getCardTemplate(cardTemplate) {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
};