import { getReposUrl } from "@config/urls";
import InputStore from "@store/InputStore/InputStore";
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

export type PrivateFields = "_repos" | "_meta";

export class ReposStore {
  private _meta: Meta = Meta.initial;
  private _repos: Repo[] = [];
  private _input: InputStore = new InputStore();

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      _meta: observable,
      _repos: observable.ref,
      meta: computed,
      repos: computed,
      getRepos: action,
    });
  }

  get meta(): Meta {
    return this._meta;
  }

  get repos(): Repo[] {
    return this._repos;
  }

  get input(): InputStore {
    return this._input;
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
