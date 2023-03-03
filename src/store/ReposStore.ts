import { getReposUrl } from "@config/urls";
import { Repo } from "@types";
import { Meta } from "@utils/meta";
import { normalizeRepo } from "@utils/normalizeRepo";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import InputStore from "./InputStore/InputStore";

export type PrivateFields = "_repos" | "_reposPage" | "_meta";

export class ReposStore {
  private _meta: Meta = Meta.initial;
  private _repos: Repo[] = [];
  private _reposPage: number = 0;
  private _input: InputStore = new InputStore();

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      _meta: observable,
      _repos: observable.ref,
      _reposPage: observable,
      meta: computed,
      repos: computed,
      reposPage: computed,
      getRepos: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get repos(): Repo[] {
    return this._repos;
  }

  get reposPage(): number {
    return this._reposPage;
  }

  get input(): InputStore {
    return this._input;
  }

  set reposPage(value: number) {
    this._reposPage = value;
  }

  async getRepos(): Promise<void> {
    try {
      this._meta = Meta.loading;
      this._repos = [];
      const response = await axios.get(getReposUrl(this._input.value));
      runInAction(() => {
        this._meta = Meta.success;
        this._repos = response.data.map(normalizeRepo);
      });
    } catch (error) {
      this._meta = Meta.error;
      this._repos = [];
    }
  }

  destroy(): void {
    this._meta = Meta.initial;
    this._repos = [];
  }
}
