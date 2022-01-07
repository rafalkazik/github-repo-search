export function getRepos(page = 1, limit = 100) {
  const apiUrl = "https://api.github.com/users";
  let usernameInput = document.querySelector(".form__input--username");

  return fetch(
    `${apiUrl}/${usernameInput.value}/repos?page=${page}&per_page=${limit}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(resp);
  });
}
