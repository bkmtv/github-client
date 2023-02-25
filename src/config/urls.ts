export const BASE_GITHUB_API_URL = "https://api.github.com";

export function getReposUrl() {
  return `${BASE_GITHUB_API_URL}/orgs/ktsstudio/repos`;
}

export function getRepoUrl(title: string) {
  return `${BASE_GITHUB_API_URL}/repos/ktsstudio/${title}`;
}

export function getReadmeUrl(title: string) {
  return `https://raw.githubusercontent.com/ktsstudio/${title}/master/README.md`;
}
