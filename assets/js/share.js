// Share functionality with Web Share API fallback to modal
(function () {
  const shareModal = document.getElementById("share-modal");
  const shareTriggers = document.querySelectorAll(".share-trigger");
  const copyUrlBtn = document.querySelector(".copy-url-btn");
  const shareUrlInput = document.getElementById("share-url-input");

  if (!shareModal || shareTriggers.length === 0) return;

  // Share data for Web Share API
  const shareData = {
    title: document.title,
    text: document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content"),
    url: window.location.origin,
  };

  // Check if Web Share API is available and can share this data
  function canUseWebShare() {
    return navigator.share && navigator.canShare && navigator.canShare(shareData);
  }

  // Handle share trigger clicks
  shareTriggers.forEach((trigger) => {
    trigger.addEventListener("click", async (e) => {
      e.preventDefault();

      if (canUseWebShare()) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // User cancelled or error - fall back to modal
          if (err.name !== "AbortError") {
            shareModal.showModal();
          }
        }
      } else {
        shareModal.showModal();
      }
    });
  });

  // Close button
  const closeBtn = shareModal.querySelector(".close-modal-x");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      shareModal.close();
    });
  }

  // Close on backdrop click
  shareModal.addEventListener("click", (e) => {
    if (e.target === shareModal) {
      shareModal.close();
    }
  });

  // Close on Escape key (native dialog behavior, but ensure it works)
  shareModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      shareModal.close();
    }
  });

  // Copy URL functionality
  if (copyUrlBtn && shareUrlInput) {
    copyUrlBtn.addEventListener("click", async () => {
      const copyText = copyUrlBtn.querySelector(".copy-text");

      try {
        await navigator.clipboard.writeText(shareUrlInput.value);
        copyText.textContent = "Copied!";
        copyUrlBtn.classList.add("copied");

        setTimeout(() => {
          copyText.textContent = "Copy Link";
          copyUrlBtn.classList.remove("copied");
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        shareUrlInput.select();
        document.execCommand("copy");
        copyText.textContent = "Copied!";

        setTimeout(() => {
          copyText.textContent = "Copy Link";
        }, 2000);
      }
    });
  }
})();
