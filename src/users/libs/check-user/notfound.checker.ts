import { CheckerChain } from './checker.interface';
import { OutputDto } from '../../../dto/output';

export class CheckUserAvailability extends CheckerChain {
  async check(user): Promise<OutputDto> {
    if (!user)
      return {
        ok: false,
        error: 'User Not Found',
      };
    return super.check(user);
  }
}
