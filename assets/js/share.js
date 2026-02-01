// Share functionality - modal first, with optional native share button
(function () {
  const shareModal = document.getElementById("share-modal");
  const shareTriggers = document.querySelectorAll(".share-trigger");
  const copyUrlBtn = document.querySelector(".copy-url-btn");
  const shareUrlInput = document.getElementById("share-url-input");
  const nativeShareBtn = document.querySelector(".native-share-btn");

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
    try {
      return navigator.share && navigator.canShare && navigator.canShare(shareData);
    } catch (err) {
      return false;
    }
  }

  // Handle share trigger clicks - always show modal first (set up early to ensure it works)
  shareTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      shareModal.showModal();
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

  // Show/hide native share button based on API availability
  if (nativeShareBtn) {
    if (canUseWebShare()) {
      nativeShareBtn.style.display = "";
      nativeShareBtn.addEventListener("click", async () => {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // User cancelled - do nothing
        }
      });
    } else {
      nativeShareBtn.style.display = "none";
    }
  }

  // Copy URL functionality (modal)
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

  // Footer copy URL functionality
  const footerCopyBtn = document.querySelector(".copy-url-footer");
  if (footerCopyBtn) {
    footerCopyBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const url = footerCopyBtn.dataset.url || window.location.origin;

      try {
        await navigator.clipboard.writeText(url);
        footerCopyBtn.classList.add("copied");

        setTimeout(() => {
          footerCopyBtn.classList.remove("copied");
        }, 2000);
      } catch (err) {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        footerCopyBtn.classList.add("copied");

        setTimeout(() => {
          footerCopyBtn.classList.remove("copied");
        }, 2000);
      }
    });
  }
})();
