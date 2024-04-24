// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.places__list');

function createCard(cardObject, deleteFunction) {
  linkValue = cardObject.link;
  placeName = cardObject.name;
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('src', linkValue);
  cardImage.setAttribute('alt', placeName);
  cardElement.querySelector('.card__title').textContent = placeName;
  deleteButton.addEventListener('click', () => deleteFunction(cardElement));
  return cardElement;
}

function deleteCard(card) {
  card.remove()
}

initialCards.forEach(function(item) {
  container.append(createCard(item, deleteCard))
});



