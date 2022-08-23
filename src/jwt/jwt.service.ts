import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { JWT_CONFIG_OPTIONS } from './jwt.constant';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {
    // console.log(options);
  }
  hello() {
    console.log('Hello');
  }

  sign(payload) {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
