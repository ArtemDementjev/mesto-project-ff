export function createCard(cardObject, deleteFunction, likeFunction, popupFunction, popupImage, popupWithImage, closeByEscape) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const heartButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardElement.querySelector('.card__title').textContent = cardObject.name;
  deleteButton.addEventListener('click', () => deleteFunction(cardElement));
  heartButton.addEventListener('click', () => likeFunction(heartButton));
  cardImage.addEventListener('click', () => popupFunction(popupWithImage, cardImage, popupImage, closeByEscape))
  return cardElement;
}

export function deleteCard(card) {
  card.remove()
}

export function likeCard(heartButton) {
  heartButton.classList.toggle('card__like-button_is-active');
}

export function showBigImage(popup, cardImage, popupImage, closeByEscape) {
  popup.classList.add('popup_is-opened');
  popupImage.setAttribute('src', cardImage.src);
  popupImage.setAttribute('alt', cardImage.alt);
  document.addEventListener('keydown', closeByEscape);
}

