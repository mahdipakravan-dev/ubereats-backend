import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JWT_CONFIG_OPTIONS } from './jwt.constant';
import { JwtModuleOptions } from './jwt.interfaces';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: JWT_CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
