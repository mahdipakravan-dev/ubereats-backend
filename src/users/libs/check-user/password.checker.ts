import { CheckerChain } from './checker.interface';
import { OutputDto } from '../../../dto/output';

export class CheckUserPasswordCompare extends CheckerChain {
  private _password?: string;

  withPassword(value: string): CheckerChain {
    this._password = value;
    return this;
  }

  async check(user): Promise<OutputDto> {
    try {
      const isOk = await user.checkPassword(this._password);
      if (!isOk)
        return {
          ok: false,
          error: 'User Password is not pair',
        };
      return super.check(user);
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
