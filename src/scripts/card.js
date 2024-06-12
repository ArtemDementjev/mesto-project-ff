export const cardFunctions = {
  createCard,
  deleteCard,
  likeCard
};

import {deleteLike, putLike} from './api';

function createCard(cardTemplate, cardObject, functions, popupFunction, ownerId, openConfirmDeletePopup) {
  const cardElement = getCardTemplate(cardTemplate);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const heartButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesQuantity = cardElement.querySelector('.likes-quantity');
  likesQuantity.innerText = cardObject.likes.length;
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardElement.querySelector('.card__title').textContent = cardObject.name;
  deleteButton.addEventListener('click', (evt) => {
    const cardToDelete = {card: cardElement, id: cardObject._id};
    openConfirmDeletePopup(evt, cardToDelete);
  });
  heartButton.addEventListener('click', () => functions.likeCard(heartButton, cardObject, likesQuantity));
  cardImage.addEventListener('click', (evt) => popupFunction(evt));
  if (!(ownerId === cardObject.owner._id)) {
    deleteButton.style.display = 'none';
  }
  if (cardObject.likes.some((object) => {
    return object._id === ownerId;
  })) {
    heartButton.classList.add('card__like-button_is-active');
  }
  // cardElement.setAttribute('id', cardObject._id);
  return cardElement;
};

function deleteCard(card) {
      card.remove()
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