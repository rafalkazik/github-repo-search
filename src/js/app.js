import css from "../styles/main.css";

const apiUrl = "https://api.github.com/users";

const form = document.querySelector(".find-user__form");

function init(e) {
  e.preventDefault();
  validateForm();
  // loadUserAvatar();
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

  function sortedData(data) {
    return data.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  function avatarData(data) {
    return data[0]["owner"]["avatar_url"];
  }

  fetch(`${apiUrl}/${usernameInput.value}/repos?page=1&per_page=1000`)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    })
    .then((data) => {
      usernameInput.value = "";
      usernameInput.classList.remove("form__input--username-error");
      insertUserRepos(sortedData(data));
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

    function setNameOfRepository() {
      const nameOfRepository = cloneReposListElement.querySelector(
        ".element-repo-name__title"
      );
      return (nameOfRepository.innerText = item.name);
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

    function setLanguageOfRepository() {
      const langOfRepositoryCircle =
        cloneReposListElement.querySelector(".fa-circle");
      const langOfRepository = cloneReposListElement.querySelector(
        ".element-repo-details__lang-text"
      );

      if (item.language === "JavaScript") {
        langOfRepositoryCircle.style.color = "#f1e05a";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "TypeScript") {
        langOfRepositoryCircle.style.color = "#2b7489";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "HTML") {
        langOfRepositoryCircle.style.color = "#e44b23";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "CSS") {
        langOfRepositoryCircle.style.color = "#563d7c";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "PHP") {
        langOfRepositoryCircle.style.color = "#4F5D95";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Vue") {
        langOfRepositoryCircle.style.color = "#2c3e50";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Go") {
        langOfRepositoryCircle.style.color = "#375eab";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Swift") {
        langOfRepositoryCircle.style.color = "#ffac45";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Java") {
        langOfRepositoryCircle.style.color = "#b07219";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Rust") {
        langOfRepositoryCircle.style.color = "#dea584";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === "Python") {
        langOfRepositoryCircle.style.color = "#3572A5";
        return (langOfRepository.innerText = item.language);
      }
      if (item.language === null) {
        langOfRepositoryCircle.style.color = "#b6b6b6";
        return (langOfRepository.innerText = "no data");
      } else {
        langOfRepositoryCircle.style.color = "#2b00d4";
        return (langOfRepository.innerText = item.language);
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
