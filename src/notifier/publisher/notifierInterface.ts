export abstract class NotifierInterface<I = unknown, O = unknown> {
  protected detail: I;
  constructor() {}

  setMessage(message) {
    this.detail = message;
    return this;
  }

  abstract publish(): Promise<O>;
}
