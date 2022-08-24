import { Inject, Injectable } from '@nestjs/common';
import { NOTIFIER_OPTION } from './notifier.constant';
import { NotifierInterface } from './notifier.interface';

@Injectable()
export class NotifierService {
  constructor(@Inject(NOTIFIER_OPTION) options: NotifierInterface) {
    console.log('ModuleOptions is ', options);
  }

  send() {
    //@TODO use factory to send
  }
}
