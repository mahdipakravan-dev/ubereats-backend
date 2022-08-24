import { NotifierInterface } from './notifierInterface';
import { NotifierMessage } from '../notifier.interface';

export class EmailPublisher extends NotifierInterface<
  NotifierMessage.Email,
  NotifierMessage.Result
> {
  publish(): Promise<any> {
    console.log('We Will Send Email ', this.detail);
    return Promise.resolve(undefined);
  }
}
