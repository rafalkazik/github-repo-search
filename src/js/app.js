import css from "../styles/main.css";
import { getRepos } from "./GitHubProvider";
import { sortResponseByStar } from "./GitHubHelper";
import { avatarData } from "./GitHubHelper";
import { colorList } from "./LanguageColors";

const apiUrl = "https://api.github.com/users";

const form = document.querySelector(".find-user__form");

function init(e) {
  e.preventDefault();
  validateForm();
}

function validateForm() {
  let usernameInput = document.querySelector(".form__input--username");

  if (usernameInput.value.length >= 1) {
    loadUserRepos();
  } else {
    window.location.reload(true);
  }
}

function loadUserRepos() {
  let usernameInput = document.querySelector(".form__input--username");

  getRepos(1, 1000, usernameInput)
    .then((data) => {
      usernameInput.value = "";
      usernameInput.classList.remove("form__input--username-error");
      insertUserRepos(sortResponseByStar(data));
      loadUserAvatar(avatarData(data));
      loadUserName(data);
    })
    .catch((err) => {
      usernameInput.value = "";
      usernameInput.classList.add("form__input--username-error");
      window.location.reload(true);
    });
}

function insertUserRepos(reposArr) {
  const reposList = document.querySelector(".repositories__list");
  const reposListElement = document.querySelector(".list__element");

  reposList.innerHTML = "";

  return reposArr.forEach((item) => {
    const cloneReposListElement = reposListElement.cloneNode(true);
    cloneReposListElement.classList.remove("list__element--prototype");

    function setRepoLink(repoLink, targetSelector) {
      const repoUrl = cloneReposListElement.querySelector(targetSelector);
      repoUrl.setAttribute("href", repoLink);
    }
    setRepoLink(item["html_url"], ".element-repo-name__link");

    function setNameOfRepository(repoName) {
      const nameOfRepository = (cloneReposListElement.querySelector(
        ".element-repo-name__title"
      ).innerText = repoName);
    }
    setNameOfRepository(item.name.replaceAll("_", "-"));

    function setIdOfRepository(repoId) {
      const idOfRepository = (cloneReposListElement.querySelector(
        ".id__number"
      ).innerText = repoId);
    }
    setIdOfRepository(item.id);

    function setDescriptionOfRepository(repoDescription) {
      const descOfRepository = cloneReposListElement.querySelector(
        ".element-repo-desc__text"
      );
      if (repoDescription) {
        descOfRepository.innerText = repoDescription;
      } else {
        descOfRepository.innerText = `No description`;
      }
    }
    setDescriptionOfRepository(item.description);

    function setLanguageOfRepository() {
      const langOfRepositoryCircle =
        cloneReposListElement.querySelector(".fa-circle");
      const langOfRepository = cloneReposListElement.querySelector(
        ".element-repo-details__lang-text"
      );

      if (item.language === null) {
        langOfRepositoryCircle.style.color = "#b6b6b6";
        return (langOfRepository.innerText = "no data");
      } else {
        const color = colorList[item.language];
        langOfRepositoryCircle.style.color = color;
        langOfRepository.innerText = item.language;
      }
    }
    setLanguageOfRepository();

    function setStarsOfRepository() {
      const starsOfRepository = cloneReposListElement.querySelector(
        ".element-repo-details__stars-text"
      );
      if (item.stargazers_count) {
        return (starsOfRepository.innerText = item.stargazers_count);
      } else {
        return (starsOfRepository.innerText = `0`);
      }
    }
    setStarsOfRepository();

    function setForksOfRepository() {
      const forksOfRepository = cloneReposListElement.querySelector(
        ".element-repo-details__forks-text"
      );
      if (item.forks) {
        return (forksOfRepository.innerText = item.forks);
      } else {
        return (forksOfRepository.innerText = `0`);
      }
    }
    setForksOfRepository();

    reposList.appendChild(cloneReposListElement);
  });
}

function showAvatarSection() {
  const avatarHeaderElement = document.querySelector(".repositories__user");
  return avatarHeaderElement.classList.add("repositories__user--active");
}

function loadUserAvatar(reposAvatar) {
  showAvatarSection();

  const avatarUrl = reposAvatar;
  const userAvatar = document
    .querySelector(".user__img")
    .setAttribute("src", avatarUrl);
}

function loadUserName(usernameOfRepos) {
  const login = usernameOfRepos[0]["owner"]["login"];
  const userName = (document.querySelector(
    ".user__name"
  ).innerText = `@${login}`);
}

form.addEventListener("submit", init);
