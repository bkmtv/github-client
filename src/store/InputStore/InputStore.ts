import { ILocalStore } from "@utils/useLocal";
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = "_value";

export default class InputStore implements ILocalStore {
  private _value: string = "";

  constructor() {
    makeObservable<InputStore, PrivateFields>(this, {
      _value: observable,
      value: computed,
      setValue: action,
    });
  }

  get value(): string {
    return this._value;
  }

  setValue(newValue: string): void {
    this._value = newValue;
  }

  destroy(): void {
    this._value = "";
  }
}
