export function sortResponseByStar(response) {
  return [...response].sort((a, b) => b.stargazers_count - a.stargazers_count);
}
