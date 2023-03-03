export const BASE_GITHUB_API_URL = "https://api.github.com";

export function getReposUrl(org: string) {
  return `${BASE_GITHUB_API_URL}/orgs/${org}/repos`;
}

export function getRepoUrl(org: string, repo: string) {
  return `${BASE_GITHUB_API_URL}/repos/${org}/${repo}`;
}

export function getReadmeUrl(org: string, repo: string) {
  return `https://raw.githubusercontent.com/${org}/${repo}/master/README.md`;
}
