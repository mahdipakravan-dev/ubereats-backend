export abstract class PublisherInterface<I = unknown, O = unknown> {
  constructor(protected detail: I) {}
  abstract publish(): Promise<O>;
}
