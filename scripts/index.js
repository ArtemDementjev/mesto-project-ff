// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.places__list');

function addCardsInitially(linkValue, placeName, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').setAttribute('src', linkValue);
  cardElement.querySelector('.card__image').setAttribute('alt', placeName);
  cardElement.querySelector('.card__title').textContent = placeName;
  deleteButton.addEventListener('click', () => deleteFunction(cardElement));
  return cardElement;
}

function deleteCard(card) {
  card.remove()
}

initialCards.forEach(function(item) {
  linkValue = item.link;
  placeName = item.name
  container.append(addCardsInitially(linkValue, placeName, deleteCard))
});



