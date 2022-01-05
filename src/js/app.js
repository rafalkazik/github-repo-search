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
      usernameInput.classList.remove("form__input--username-error");
      insertUserRepos(data);
      loadUserAvatar(data);
      loadUserName(data);
    })
    .catch((err) => {
      usernameInput.value = "";
      usernameInput.classList.add("form__input--username-error");
    });
}

function insertUserRepos(reposArr) {
  const reposList = document.querySelector(".repositories__list");
  const reposListElement = document.querySelector(".list__element");

  reposList.innerHTML = "";

  return reposArr.forEach((item) => {
    const cloneReposListElement = reposListElement.cloneNode(true);
    cloneReposListElement.classList.remove("list__element--prototype");

    function setNameOfRepository() {
      const nameOfRepository = cloneReposListElement.querySelector(
        ".element-repo-name__title"
      );
      return (nameOfRepository.innerText = item.full_name);
    }
    setNameOfRepository();

    function setIdOfRepository() {
      const idOfRepository = cloneReposListElement.querySelector(".id__number");
      return (idOfRepository.innerText = item.id);
    }
    setIdOfRepository();

    function setDescriptionOfRepository() {
      const descOfRepository = cloneReposListElement.querySelector(
        ".element-repo-desc__text"
      );
      if (item.description) {
        return (descOfRepository.innerText = item.description);
      } else {
        return (descOfRepository.innerText = `No description`);
      }
    }
    setDescriptionOfRepository();

    reposList.appendChild(cloneReposListElement);
  });
}

function loadUserAvatar(reposAv) {
  const avatarUrl = reposAv[0]["owner"]["avatar_url"];
  const userAvatar = document
    .querySelector(".user__img")
    .setAttribute("src", avatarUrl);
  userAvatar;
}

function loadUserName(usernameOfRepos) {
  const login = usernameOfRepos[0]["owner"]["login"];
  const userName = (document.querySelector(
    ".user__name"
  ).innerText = `@${login}`);
}

form.addEventListener("submit", init);
