import { NotifierInterface } from './notifierInterface';
import { NotifierMessage } from '../notifier.interface';

export class SmsPublisher extends NotifierInterface<
  NotifierMessage.Sms,
  NotifierMessage.Result
> {
  publish(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
