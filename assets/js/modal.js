const btnOpenModal = document.querySelector(".open-modal");
const btnClose = document.querySelector(".close-modal");
const modal = document.querySelector(".notify-modal");

btnOpenModal.addEventListener("click", () => {
  modal.showModal();
});

btnClose.addEventListener("click", () => {
  modal.close();
});
