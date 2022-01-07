export function sortResponseByStar(response) {
  return [...response].sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export function avatarData(data) {
  return data[0]["owner"]["avatar_url"];
}
