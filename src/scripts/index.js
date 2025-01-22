import "../styles/styles.scss"
import { initFormValidation } from "./formValidation.js"
import { toggleModal } from "./modal.js"

const openModalBtn = document.querySelector('.open-modal-btn')
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    toggleModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initFormValidation();
})