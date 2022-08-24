import { NotifierHashMap, NotifiersEnum } from './notifier.interface';
import { NotifierInterface } from './publisher/notifierInterface';
import { SmsPublisher } from './publisher/sms.publisher';
import { EmailPublisher } from './publisher/email.publisher';

export class NotifierFactory {
  private _publisher?: NotifierInterface;
  constructor() {}

  setPublisher<T extends keyof NotifierHashMap>(
    notifier: T,
    message: NotifierHashMap[T],
  ) {
    if (notifier === NotifiersEnum.SMS)
      this._publisher = new SmsPublisher().setMessage(message);
    if (notifier === NotifiersEnum.EMAIL)
      this._publisher = new EmailPublisher().setMessage(message);
  }

  sendMessage() {
    return this._publisher.publish();
  }
}
