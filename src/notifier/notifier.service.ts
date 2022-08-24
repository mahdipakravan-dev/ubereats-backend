import { Inject, Injectable } from '@nestjs/common';
import { NOTIFIER_OPTION } from './notifier.constant';
import { NotifierHashMap, NotifierInterface } from './notifier.interface';
import { NotifierFactory } from './notifier.factory';

@Injectable()
export class NotifierService {
  constructor(@Inject(NOTIFIER_OPTION) options: NotifierInterface) {
    console.log('ModuleOptions is ', options);
  }

  send<T extends keyof NotifierHashMap>(
    notifier: T,
    message: NotifierHashMap[T],
  ) {
    const notifierFactory = new NotifierFactory();
    notifierFactory.setPublisher(notifier, message);
    return notifierFactory.sendMessage();
  }
}
