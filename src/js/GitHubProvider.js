const apiUrl = "https://api.github.com/users";
export function getRepos(page = 1, limit = 100, userName) {
  return fetch(
    `${apiUrl}/${userName.value}/repos?page=${page}&per_page=${limit}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return Promise.reject(resp);
  });
}
