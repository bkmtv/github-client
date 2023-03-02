export type ApiRepo = {
  id: number;
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
  stargazers_count: number;
  updated_at: string;
};

export type Repo = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  stars: number;
  updated: Date;
};

export type ApiRepoPage = {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
};

export type RepoPage = {
  title: string;
  description: string;
  url: string;
  stars: number;
  watchers: number;
  forks: number;
  topics: string[];
};
