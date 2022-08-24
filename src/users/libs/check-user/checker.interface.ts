import { User } from '../../entities/user.entity';
import { OutputDto } from '../../../dto/output';

export class CheckerChain {
  private nextChecker?: CheckerChain;
  constructor() {}

  setNextChecker(nextChecker: CheckerChain) {
    this.nextChecker = nextChecker;
    return this;
  }
  async check(user: User): Promise<OutputDto> {
    if (!this.nextChecker) {
      return { ok: true };
    }
    return await this.nextChecker.check(user);
  }
}
