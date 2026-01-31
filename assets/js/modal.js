// Notify modal (legacy)
const btnOpenModal = document.querySelector(".open-modal");
const notifyModal = document.querySelector(".notify-modal");

if (notifyModal != undefined && btnOpenModal != undefined) {
  btnOpenModal.addEventListener("click", () => {
    notifyModal.showModal();
  });

  // Handle all close buttons (X button and "Never mind" button)
  const closeButtons = notifyModal.querySelectorAll(".close-modal-x, .close-modal");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      notifyModal.close();
    });
  });
}

// Subscribe modal
(function () {
  const subscribeModal = document.getElementById("subscribe-modal");
  const subscribeTriggers = document.querySelectorAll(".subscribe-trigger");

  if (!subscribeModal || subscribeTriggers.length === 0) return;

  // Handle subscribe trigger clicks
  subscribeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      subscribeModal.showModal();
    });
  });

  // Close button
  const closeBtn = subscribeModal.querySelector(".close-modal-x");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      subscribeModal.close();
    });
  }

  // Cancel button
  const cancelBtn = subscribeModal.querySelector(".close-modal");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      subscribeModal.close();
    });
  }

  // Close on backdrop click
  subscribeModal.addEventListener("click", (e) => {
    if (e.target === subscribeModal) {
      subscribeModal.close();
    }
  });
})();
