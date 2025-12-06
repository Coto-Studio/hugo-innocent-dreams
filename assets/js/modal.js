const btnOpenModal = document.querySelector(".open-modal");
const modal = document.querySelector(".notify-modal");

if (modal != undefined) {
  btnOpenModal.addEventListener("click", () => {
    modal.showModal();
  });

  // Handle all close buttons (X button and "Never mind" button)
  const closeButtons = modal.querySelectorAll(".close-modal-x, .close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.close();
    });
  });
}
