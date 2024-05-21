export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export const cardsFunctions = {
  createCard,
  deleteCard,
  likeCard
}

function createCard(cardObject, functions, popupFunction, popupWithImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const heartButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardElement.querySelector('.card__title').textContent = cardObject.name;
  deleteButton.addEventListener('click', () => functions.deleteCard(cardElement));
  heartButton.addEventListener('click', () => functions.likeCard(heartButton));
  cardImage.addEventListener('click', () => popupFunction(popupWithImage))
  return cardElement;
}

function deleteCard(card) {
  card.remove()
}

function likeCard(heartButton) {
  heartButton.classList.toggle('card__like-button_is-active');
}