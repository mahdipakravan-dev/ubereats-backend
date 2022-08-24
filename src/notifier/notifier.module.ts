import { DynamicModule, Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { NotifierInterface } from './notifier.interface';
import { NOTIFIER_OPTION } from './notifier.constant';

@Module({})
export class NotifierModule {
  static forRoot(options: NotifierInterface): DynamicModule {
    return {
      module: NotifierModule,
      providers: [
        {
          provide: NOTIFIER_OPTION,
          useValue: options,
        },
        NotifierService,
      ],
      exports: [NotifierModule],
    };
  }
}
