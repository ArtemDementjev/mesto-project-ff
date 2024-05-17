import './pages/index.css';

import {createCard, deleteCard, likeCard, showBigImage} from './scripts/cards.js';

import {openModal, closeModal, handleFormSubmit, closeByEscape} from './scripts/modal.js';

export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupWithImage = document.querySelector('.popup_type_image');

const formEditProfile = document.forms['edit-profile'];
export const editProfileName = formEditProfile['name'];
export const editProfiledescription = formEditProfile['description'];
export let name = document.querySelector('.profile__title');
export let profileDescription = document.querySelector('.profile__description');

const formNewPlace = document.forms['new-place'];
const newPlaceName = formNewPlace['place-name'];
const newPlaceLink = formNewPlace['link'];

const popupImage = document.querySelector('.popup__image');

const initialCards = [
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

const container = document.querySelector('.places__list');

initialCards.forEach(function(item) {
  container.append(createCard(item, deleteCard, likeCard, showBigImage, popupImage, popupWithImage, closeByEscape))
});

function detectClickTarget(event) {
  if (event.target.classList.contains('profile__edit-button')) {
    return 'editProfile';
  }
  if (event.target.classList.contains('profile__add-button')) {
    return 'addCard';
  }
  // if (event.target.classList.contains('card__image')) {
  //   return 'image';
  // }
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup_is-opened')) {
    return 'close'
  }
};

document.addEventListener('click', function(evt) {
  let clickTarget = detectClickTarget(evt);
  openModal(clickTarget, evt);
  closeModal(clickTarget);
});

formEditProfile.addEventListener('submit', handleFormSubmit);

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardObject = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  }
  container.prepend(createCard(cardObject, deleteCard, likeCard, showBigImage, popupImage, popupWithImage, closeByEscape);
  closeModal('close');
  formNewPlace.reset();
});