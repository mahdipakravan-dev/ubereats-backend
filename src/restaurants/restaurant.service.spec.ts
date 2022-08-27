import { Test } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './entities/restaurant.entity';
import { Verification } from './entities/verification.entity';
import { NotifierService } from '../notifier/notifier.service';
import { JwtService } from '../jwt/jwt.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

/*Fake DB*/
const mockedRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
/*MockJWT*/
const mockedJWT = {
  sign: jest.fn(),
  verify: jest.fn(),
};
/*MockNotifier*/
const mockedNotifier = {
  send: jest.fn(),
};

const createAccountArgs = {
  email: 'mahdi@gmail.com',
  password: '123456',
  role: UserRole.OWNER,
};

type MockedRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('UsersService', () => {
  let service: RestaurantService;
  let notifierService: NotifierService;
  let usersRepository: MockedRepository<User>;
  let verificationRepository: MockedRepository<Verification>;

  beforeAll(async () => {
    //Create testing module
    const module = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockedRepository(),
        },
        {
          provide: JwtService,
          useValue: mockedJWT,
        },
        {
          provide: NotifierService,
          useValue: mockedNotifier,
        },
      ],
    }).compile();
    service = module.get<RestaurantService>(RestaurantService);
    notifierService = module.get<NotifierService>(NotifierService);
    usersRepository = module.get(getRepositoryToken(User));
    verificationRepository = module.get(getRepositoryToken(Verification));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('CreateAccount', () => {
    it('should fail if user exist', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'mahdi@gmail.com',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user already with this email',
      });
    });

    it('should create account', async () => {
      usersRepository.findOne.mockResolvedValue(undefined);
      usersRepository.create.mockReturnValue(createAccountArgs);
      usersRepository.save.mockResolvedValue(createAccountArgs);
      verificationRepository.create.mockReturnValue({});
      verificationRepository.save.mockResolvedValue({
        code: 'Code',
      });
      const result = await service.createAccount(createAccountArgs);
      console.log({ result });
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs);

      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs);

      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        user: createAccountArgs,
      });
      expect(notifierService.send).toHaveBeenCalledTimes(1);
      expect(notifierService.send).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Object),
      );
      expect(result).toMatchObject({ ok: true });
    });

    it('should fail on exception', async () => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({ ok: false, error: 'Internal' });
    });
  });

  describe('login', () => {
    it.todo('should fail if user not exist');
    it.todo('should fail if password wrong');
    it.todo('should fail if not verified');
    it.todo('should fail if exception');
    it.todo('should login and get token');
  });
  describe('findById', () => {
    it.todo('should find an existing user');
    it.todo('should failed if no user found');
  });
  describe('edit', () => {
    it.todo('should change email');
    it.todo('should change password');
    it.todo('should fail on exception');
  });
  describe('verify', () => {
    it.todo('should verify');
    it.todo('should fail in exception');
    it.todo('should on not found');
  });
});
