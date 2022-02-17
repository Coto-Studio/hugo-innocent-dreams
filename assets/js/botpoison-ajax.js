// Botpoison Ajax Form.
(function () {
  // Vars.
  var $form = document.getElementsByTagName("form")[0];
  var $submit = $form.querySelector('button[type="submit"]'),
    $message;

  // Bail if addEventListener isn't supported.
  if (!("addEventListener" in $form)) return;

  // Message.
  $message = document.createElement("span");
  $message.classList.add("message");
  $form.appendChild($message);

  $message._show = function (type, text) {
    $message.innerHTML = text;
    $message.classList.add(type);
    $message.classList.add("visible");

    window.setTimeout(function () {
      $message._hide();
    }, 3000);
  };

  $message._hide = function () {
    $message.classList.remove("visible");
  };

  // Events.
  // Note: If you're *not* using AJAX, get rid of this event listener.
  $form.addEventListener("submit", function (event) {
    event.stopPropagation();
    event.preventDefault();

    // Hide message.
    $message._hide();

    // Disable submit.
    $submit.disabled = true;

    // Process form.
    // Note: Doesn't actually do anything yet (other than report back with a "thank you"),
    // but there's enough here to piece together a working AJAX submission call that does.
    window.setTimeout(async function () {
      // $form.submit();

      // Get Form Attributes
      const formAction = $form.getAttribute("action");
      const pubKey = $form.dataset.botpoisonPublicKey;
      const botpoison = new Botpoison({
        publicKey: pubKey,
      });

      // Get form data
      const formData = new FormData($form);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      // Get Botpoison solution
      const { solution } = await botpoison.challenge({
        onProgress: (progress) => {
          if (progress === 0.5) {
            console.log("Halfway there");
          } else if (progress === 1) {
            console.log("Finished");
          }
        },
      });
      data["_botpoison"] = solution;

      // Create HTTP request
      fetch(formAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          console.log(response);
          $message._show("success", "All set. Thank you!");
        })
        .catch(function (error) {
          $message._show("error", "Something went wrong... :(");
        });

      // Reset form.
      $form.reset();

      // Enable submit.
      $submit.disabled = false;
    }, 750);
  });
})();
