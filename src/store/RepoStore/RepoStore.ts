import { getRepoUrl } from "@config/urls";
import { RepoPage } from "@types";
import { Meta } from "@utils/meta";
import { normalizeRepoPage } from "@utils/normalizeRepo";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type PrivateFields = "_repoPage" | "_meta";

export class RepoStore {
  private _meta: Meta = Meta.initial;
  private _repoPage: RepoPage[] = [];

  constructor() {
    makeObservable<RepoStore, PrivateFields>(this, {
      _meta: observable,
      _repoPage: observable.ref,
      meta: computed,
      repoPage: computed,
      getRepoPage: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get repoPage(): RepoPage[] {
    return this._repoPage;
  }

  async getRepoPage(): Promise<void> {
    try {
      this._meta = Meta.loading;
      this._repoPage = [];
      const response = await axios.get(getRepoUrl("", ""));
      runInAction(() => {
        this._meta = Meta.success;
        this._repoPage = response.data.map(normalizeRepoPage);
      });
    } catch (error) {
      this._meta = Meta.error;
      this._repoPage = [];
    }
  }

  destroy(): void {
    this._meta = Meta.initial;
    this._repoPage = [];
  }
}
