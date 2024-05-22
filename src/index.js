import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {cardFunctions} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;

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

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileDataOnPage.name.textContent = inputsEditProfile.name.value;
  profileDataOnPage.about.textContent = inputsEditProfile.about.value;
  closeModal(popupEditProfile);
};

function openImagePopup(evt) {
  openModal(popupWithImage);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.innerText = evt.target.alt;
};


initialCards.forEach(function(item) {
  container.append(cardFunctions.createCard(cardTemplate, item, cardFunctions, openImagePopup))
});

buttonProfileEdit.addEventListener('click', () => {
  openModal(popupEditProfile);
  inputsEditProfile.name.value = profileDataOnPage.name.innerText;
  inputsEditProfile.about.value = profileDataOnPage.about.innerText;
});

buttonAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
  formNewPlace.reset();
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  }
  container.prepend(cardFunctions.createCard(cardTemplate, cardObject, cardFunctions, openImagePopup));
  closeModal(popupAddCard);
});