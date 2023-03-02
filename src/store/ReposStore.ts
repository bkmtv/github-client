import { getReposUrl } from "@config/urls";
import { Repo } from "@types";
import { normalizeRepo } from "@utils/normalizeRepo";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export class ReposStore {
  private _repos: Repo[] = [];

  constructor() {
    makeObservable<ReposStore, "_repos">(this, {
      _repos: observable.ref,
      repos: computed,
      getRepos: action,
    });
  }

  get repos(): Repo[] {
    return this._repos;
  }

  async getRepos(): Promise<void> {
    try {
      this._repos = [];
      const response = await axios.get(getReposUrl());
      runInAction(() => {
        this._repos = response.data.map(normalizeRepo);
      });
    } catch (error) {
      this._repos = [];
    }
  }
}
