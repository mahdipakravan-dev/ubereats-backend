import { User } from './entities/user.entity';
import { CheckUserAvailability } from './libs/check-user/notfound.checker';
import { CheckUserPasswordCompare } from './libs/check-user/password.checker';
import { CheckUserVerification } from './libs/check-user/verify.checker';
import { OutputDto } from '../dto/output';

export class UserCheckerHelper {
  constructor(private user: User) {}

  async checkLoginRequirement(password: string): Promise<OutputDto> {
    const [checkAvailability, checkPassword, checkVerification] = [
      new CheckUserAvailability(),
      new CheckUserPasswordCompare().withPassword(password),
      new CheckUserVerification(),
    ];

    checkAvailability.setNextChecker(checkPassword);
    checkPassword.setNextChecker(checkVerification);

    try {
      return await checkAvailability.check(this.user);
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
