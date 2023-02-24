import type { ApiRepo, Repo } from "@types";

export const normalizeRepo = (repo: ApiRepo): Repo => ({
  id: repo.id,
  image: repo.owner.avatar_url,
  title: repo.name,
  subtitle: repo.owner.login,
  stars: repo.stargazers_count,
  updated: repo.updated_at,
});
