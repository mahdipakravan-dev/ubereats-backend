import { CheckerChain } from './checker.interface';
import { OutputDto } from '../../../dto/output';

export class CheckUserVerification extends CheckerChain {
  async check(user): Promise<OutputDto> {
    if (!user.verified)
      return {
        ok: false,
        error: 'Please verify your account first',
      };
    return super.check(user);
  }
}
