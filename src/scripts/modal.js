export function openModal(popupToOpen) {
  popupToOpen.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeHandler);
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closeHandler);
};

function closeHandler (evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
  closeModal(evt.target.closest('.popup'));
  };
};