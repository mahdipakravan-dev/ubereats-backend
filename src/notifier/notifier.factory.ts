import { PublishersEnum } from './notifier.interface';
import { PublisherInterface } from './publisher/publisher.interface';
import { SmsPublisher } from './publisher/sms.publisher';

export class NotifierFactory {
  private _publisher?: PublisherInterface;
  constructor(publisher: PublishersEnum, message: any) {
    if (publisher === PublishersEnum.SMS)
      this._publisher = new SmsPublisher(message);
    if (publisher === PublishersEnum.EMAIL)
      this._publisher = new SmsPublisher(message);
  }

  sendMessage() {
    return this._publisher.publish();
  }
}
