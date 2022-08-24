import { PublisherInterface } from './publisher.interface';
import { NotifierMessage } from '../notifier.interface';

export class SmsPublisher extends PublisherInterface<
  NotifierMessage.Sms,
  NotifierMessage.Result
> {
  publish(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
