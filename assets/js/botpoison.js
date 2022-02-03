var formElement = document.getElementById("signup-form");
var buttonElement = document.getElementById("submit");
formElement.addEventListener("botpoison-challenge-start", function () {
  buttonElement.setAttribute("disabled", "disabled");
});
formElement.addEventListener("botpoison-challenge-success", function () {
  buttonElement.removeAttribute("disabled");
});
formElement.addEventListener("botpoison-challenge-error", function () {
  buttonElement.removeAttribute("disabled");
});
