var formElement = document.getElementById("signup-form");
var inputElement = document.getElementById("submit");
formElement.addEventListener("botpoison-challenge-start", function () {
  inputElement.setAttribute("disabled", "disabled");
});
formElement.addEventListener("botpoison-challenge-success", function () {
  inputElement.removeAttribute("disabled");
});
formElement.addEventListener("botpoison-challenge-error", function () {
  inputElement.removeAttribute("disabled");
});
