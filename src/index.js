import './pages/index.css';
import {cardFunctions} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getAccountInfo, getInitialCards} from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content;

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupWithImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit_image');

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__image');

const formEditProfile = document.forms['edit-profile'];
const inputsEditProfile = {
  name: formEditProfile['name'],
  about: formEditProfile['description'],
};

const formEditAvatar = document.forms['edit-profile-image'];
const inputEditAvatar = formEditAvatar['avatar-edit'];

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileDataOnPage = {
  name: document.querySelector('.profile__title'),
  about: document.querySelector('.profile__description'),
  avatar: document.querySelector('.profile__image'),
};

const formNewPlace = document.forms['new-place'];
const newPlaceName = formNewPlace['place-name'];
const newPlaceLink = formNewPlace['link'];

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const container = document.querySelector('.places__list');

function submitEditProfileForm(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').innerText = 'Сохранение...';
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: `${inputsEditProfile.name.value}`,
    about: `${inputsEditProfile.about.value}`
  })
  })
  .then(res => res.json())
  .then((result) => {
    profileDataOnPage.name.textContent = result.name;
    profileDataOnPage.about.textContent = result.about;
  })
  .finally(() => {
    closeModal(popupEditProfile);
    evt.target.querySelector('.popup__button').innerText = 'Сохранить'
  })
};

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').innerText = 'Сохранение...';
  fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: `${inputEditAvatar.value}`
  })
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result)
    profileDataOnPage.avatar.style.backgroundImage = `url(${result.avatar})`
  })
  .finally(() => {
    evt.target.querySelector('.popup__button').innerText = 'Сохранить'
    closeModal(popupEditAvatar);
  })
};

function openImagePopup(evt) {
  openModal(popupWithImage);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.innerText = evt.target.alt;
};

enableValidation(validationSettings);

buttonProfileEdit.addEventListener('click', () => {
  openModal(popupEditProfile);
  clearValidation(formEditProfile, validationSettings);
  inputsEditProfile.name.value = profileDataOnPage.name.innerText;
  inputsEditProfile.about.value = profileDataOnPage.about.innerText;
});

buttonAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
  clearValidation(formNewPlace, validationSettings)
  formNewPlace.reset();
});

avatar.addEventListener('click', () => {
  openModal(popupEditAvatar);
  clearValidation(inputEditAvatar, validationSettings);
  formEditAvatar.reset();
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formEditAvatar.addEventListener('submit', submitEditAvatarForm);

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').innerText = 'Создание...';
  fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
    method: 'POST',
    headers: {
      authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${newPlaceName.value}`,
      link: `${newPlaceLink.value}`
    })
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      container.prepend(cardFunctions.createCard(cardTemplate, result, cardFunctions, openImagePopup, {'_id': '0aaf1539537bfb94e4b997f9'}));
    })
    .finally(() => {
      evt.target.querySelector('.popup__button').innerText = 'Создать';
      closeModal(popupAddCard);
    })
});

Promise.all([
    fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
    method: "GET",
    headers: {
      authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9'
      }
    })
    .then(res => res.json()),
    fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
      method: "GET",
      headers: {
      authorization: '11d21809-1731-4190-b45a-c5d2098fc1b9'
      }
    })
    .then(res => res.json())
  ])
    .then(([result1, result2]) => {
      profileDataOnPage.name.textContent = result1.name;
      profileDataOnPage.about.textContent = result1.about;
      profileDataOnPage.avatar.style.backgroundImage = `url(${result1.avatar})`;
      result2.forEach(function(item) {
        container.append(cardFunctions.createCard(cardTemplate, item, cardFunctions, openImagePopup, result1));
      });
    })