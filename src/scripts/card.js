export const cardFunctions = {
  createCard,
  deleteCard,
  likeCard,
  getCardTemplate
};

function createCard(cardTemplate, cardObject, functions, popupFunction) {
  const cardElement = functions.getCardTemplate(cardTemplate);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const heartButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', cardObject.link);
  cardImage.setAttribute('alt', cardObject.name);
  cardElement.querySelector('.card__title').textContent = cardObject.name;
  deleteButton.addEventListener('click', () => functions.deleteCard(cardElement));
  heartButton.addEventListener('click', () => functions.likeCard(heartButton));
  cardImage.addEventListener('click', (evt) => popupFunction(evt))
  return cardElement;
};

function deleteCard(card) {
  card.remove()
};

function likeCard(heartButton) {
  heartButton.classList.toggle('card__like-button_is-active');
};

function getCardTemplate(cardTemplate) {
  return cardTemplate.querySelector('.places__item').cloneNode(true);
};