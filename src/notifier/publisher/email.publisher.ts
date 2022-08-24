import { PublisherInterface } from './publisher.interface';
import { NotifierMessage } from '../notifier.interface';

export class EmailPublisher extends PublisherInterface<
  NotifierMessage.Email,
  NotifierMessage.Result
> {
  publish(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
