import './pages/index.css';

import {initialCards, cardsFunctions} from './scripts/cards.js';

import {openModal, closeModal} from './scripts/modal.js';

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupWithImage = document.querySelector('.popup_type_image');

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const formEditProfile = document.forms['edit-profile'];
const inputsEditProfile = {
  name: formEditProfile['name'],
  about: formEditProfile['description']
};

const profileDataOnPage = {
  name: document.querySelector('.profile__title'),
  about: document.querySelector('.profile__description')
};

const formNewPlace = document.forms['new-place'];
const newPlaceName = formNewPlace['place-name'];
const newPlaceLink = formNewPlace['link'];

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const container = document.querySelector('.places__list');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileDataOnPage.name.textContent = inputsEditProfile.name.value;
  profileDataOnPage.about.textContent = inputsEditProfile.about.value;
  closeModal(evt);
}

initialCards.forEach(function(item) {
  container.append(cardsFunctions.createCard(item, cardsFunctions, openModal, popupWithImage))
});

buttonProfileEdit.addEventListener('click', () => {
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
});

document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt);
    };
    if (evt.target.classList.contains('profile__edit-button')) {
      inputsEditProfile.name.value = profileDataOnPage.name.innerText;
      inputsEditProfile.about.value = profileDataOnPage.about.innerText;
    };
    if (evt.target.classList.contains('card__image')) {
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popupCaption.innerText = evt.target.alt;
    };
});

formEditProfile.addEventListener('submit', handleFormSubmit);

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  }
  container.prepend(cardsFunctions.createCard(cardObject, cardsFunctions, openModal, popupWithImage));
  closeModal(evt);
  formNewPlace.reset();
});