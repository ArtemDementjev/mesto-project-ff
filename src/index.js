import './pages/index.css';
import {cardFunctions} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import {getAccountInfo, getInitialCards, postCard, patchAvatar, patchProfileInfo} from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content;

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupWithImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit_image');
const popupConfirmDelete = document.querySelector('.popup_type_confirm_delete');

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__image');
const crossButtons = Array.from(document.querySelectorAll('.popup__close'));

const formEditProfile = document.forms['edit-profile'];
const inputsEditProfile = {
  name: formEditProfile['name'],
  about: formEditProfile['description'],
};

const formConfirmDelete = document.forms['confirm-delete'];

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
  patchProfileInfo(inputsEditProfile.name.value, inputsEditProfile.about.value)
  .then((result) => {
    profileDataOnPage.name.textContent = result.name;
    profileDataOnPage.about.textContent = result.about;
  })
  .catch((err) => console.log(err))
  .finally(() => {
    closeModal(popupEditProfile);
    evt.target.querySelector('.popup__button').innerText = 'Сохранить'
  })
};

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').innerText = 'Сохранение...';
  patchAvatar(inputEditAvatar.value)
  .then((result) => {
    profileDataOnPage.avatar.style.backgroundImage = `url(${result.avatar})`
  })
  .catch((err) => console.log(err))
  .finally(() => {
    evt.target.querySelector('.popup__button').innerText = 'Сохранить'
    closeModal(popupEditAvatar);
  })
};

function submitConfirmDeleteForm(evt) {
  const cardToDelete = document.getElementById(`${evt.target.closest('.popup').id}`);
  cardFunctions.deleteCard(cardToDelete)
  closeModal(popupConfirmDelete);
}

function openImagePopup(evt) {
  openModal(popupWithImage);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.innerText = evt.target.alt;
};

enableValidation(validationSettings);

crossButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    closeModal(evt.target.closest('.popup'))
  })
})

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

formConfirmDelete.addEventListener('submit', submitConfirmDeleteForm)

formEditProfile.addEventListener('submit', submitEditProfileForm);

formEditAvatar.addEventListener('submit', submitEditAvatarForm);

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  evt.target.querySelector('.popup__button').innerText = 'Создание...';
  postCard(newPlaceName, newPlaceLink)
    .then((result) => {
      container.prepend(cardFunctions.createCard(cardTemplate, result, cardFunctions, openImagePopup, {'_id': '0aaf1539537bfb94e4b997f9'}));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      evt.target.querySelector('.popup__button').innerText = 'Создать';
      closeModal(popupAddCard);
    })
});

Promise.all([
  getAccountInfo(),
  getInitialCards()
  ])
    .then(([accountInfo, cards]) => {
      profileDataOnPage.name.textContent = accountInfo.name;
      profileDataOnPage.about.textContent = accountInfo.about;
      profileDataOnPage.avatar.style.backgroundImage = `url(${accountInfo.avatar})`;
      cards.forEach(function(item) {
        container.append(cardFunctions.createCard(cardTemplate, item, cardFunctions, openImagePopup, accountInfo));
      })
    })
    .catch((err) => console.log(err))
    .finally(() => {
      const deleteButtons = Array.from(container.querySelectorAll('.card__delete-button'));
      deleteButtons.forEach((button) => {
        button.addEventListener('click', (evt) => {
          openModal(popupConfirmDelete);
          popupConfirmDelete.setAttribute('id', `${evt.target.closest('.card').id}`)
        })
      })
    })