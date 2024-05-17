import {popupEditProfile, popupNewCard, popupWithImage, editProfileName, editProfiledescription, name, profileDescription} from '../index.js';

export function openModal(clickTarget, evt) {
  switch (clickTarget) {
    case 'editProfile':
      popupEditProfile.classList.add('popup_is-opened');
      editProfileName.value = name.textContent;
      editProfiledescription.value = profileDescription.textContent;
      document.addEventListener('keydown', closeByEscape);
      break
    case 'addCard':
      popupNewCard.classList.add('popup_is-opened');
      document.addEventListener('keydown', closeByEscape);
      break
    case 'image':
      popupWithImage.classList.add('popup_is-opened');
      const image = document.querySelector('.popup__image');
      image.setAttribute('src', evt.target.src);
      image.setAttribute('alt', evt.target.alt);
      document.addEventListener('keydown', closeByEscape);
      break
  }
};

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    popupOpened.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  }
}

export function closeModal(clickTarget) {
  if (clickTarget === 'close') {
    const popupOpened = document.querySelector('.popup_is-opened');
    popupOpened.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  }
};

export function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = editProfileName.value;
  profileDescription.textContent = editProfiledescription.value;
  closeModal('close');
}

