import { JwtService } from './../jwt/jwt.service';
import { Verification } from './entities/verification.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { MailService } from 'src/mail/mail.service';

const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let usersRepository: MockRepository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    
    it('deve falhar se o usuário existir', async () => {
         usersRepository.findOne.mockResolvedValue({
           id:1,
           email:'qqqq@gmail.com',
         });
        const result = await service.createAccount({
           email:'',
           password:'',
           role: 0,
         });
         expect(result).toMatchObject({
           ok: false, 
           error: 'Existe um usuário com este email',
        });
    });
  });
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
