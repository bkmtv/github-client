import type { ApiRepo, Repo, ApiRepoPage, RepoPage } from "@types";

export const normalizeRepo = (repo: ApiRepo): Repo => ({
  id: repo.id,
  image: repo.owner.avatar_url,
  title: repo.name,
  subtitle: repo.owner.login,
  stars: repo.stargazers_count,
  updated: new Date(repo.updated_at),
});

export const normalizeRepoPage = (repo: ApiRepoPage): RepoPage => ({
  title: repo.full_name,
  description: repo.description,
  url: repo.html_url,
  stars: repo.stargazers_count,
  watchers: repo.watchers_count,
  forks: repo.forks_count,
  topics: repo.topics,
});
