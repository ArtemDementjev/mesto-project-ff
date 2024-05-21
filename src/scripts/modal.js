export function openModal(popupToOpen) {
  popupToOpen.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    popupOpened.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  }
}

export function closeModal(popup) {
  popup.target.closest('.popup').classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
};


