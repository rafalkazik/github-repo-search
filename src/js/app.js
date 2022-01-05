import css from "../styles/main.css";

const apiUrl = "https://api.github.com/users";

const form = document.querySelector(".find-user__form");

function init(e) {
  e.preventDefault();
  validateForm();
  loadUserAvatar();
}

function validateForm() {
  let usernameInput = document.querySelector(".form__input--username");

  if (usernameInput.value.length >= 4) {
    loadUserRepos();
    usernameInput.classList.remove("form__input--username-error");
  }

  if (usernameInput.value.length < 4 || usernameInput.value.length > 39) {
    usernameInput.value = "";
    usernameInput.classList.add("form__input--username-error");
  }
}

function loadUserRepos() {
  let usernameInput = document.querySelector(".form__input--username");

  fetch(`${apiUrl}/${usernameInput.value}/repos`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    })
    .then((data) => {
      usernameInput.value = "";
      console.log(data);
    })
    .catch((err) => {
      usernameInput.value = "";
      alert("blad!");
    });
}

function loadUserAvatar() {
  console.log("av_change");
}

form.addEventListener("submit", init);
