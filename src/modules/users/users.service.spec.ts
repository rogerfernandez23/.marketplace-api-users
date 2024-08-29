import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { UsersMapper } from './mapper/users.mapper';
import { JwtTokens } from '../auth/strategies/jwt-tokens';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../tokens/token.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ITokens } from '../auth/strategies/jwt-tokens.interface';
import { UserRegisterResponseDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const usersEntityList: Users[] = [
  new Users({ id: '1', firstName: 'User1', phone: '000000000' }),
  new Users({ id: '2', firstName: 'User2', phone: '000000001' }),
  new Users({ id: '3', firstName: 'User3', phone: '000000002' }),
];

const usersMapper = {
  toResponseUser: jest.fn().mockImplementation((user: Users) => ({
    id: user.id,
    firstName: user.firstName,
    phone: user.phone,
  })),
  toCreateUser: jest.fn().mockImplementation((user: Users) => ({
    id: user.id,
    firstName: user.firstName,
    phone: user.phone,
  })),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let repository: Repository<Users>;

  beforeEach(async () => {
    repository = {
      save: jest.fn().mockResolvedValue(usersEntityList[0]),
      find: jest.fn().mockResolvedValue(usersEntityList),
      findOneBy: jest.fn().mockResolvedValue(usersEntityList[0]),
      update: jest.fn().mockResolvedValue(usersEntityList[0]),
      delete: jest.fn().mockResolvedValue(usersEntityList[0]),
    } as unknown as Repository<Users>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersMapper,
        JwtTokens,
        {
          provide: UsersRepository,
          useValue: {
            repository,
          },
        },
        {
          provide: UsersMapper,
          useValue: usersMapper,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of all users', async () => {
      // Arrange
      const expectResult = usersEntityList.map((user) =>
        usersMapper.toResponseUser(user),
      );

      // Act
      const result = await usersService.findAll();

      // Assert
      expect(result).toEqual(expectResult);
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const error = new Error();
      jest
        .spyOn(usersRepository.repository, 'find')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.findAll()).rejects.toThrow(error);
    });
  });

  describe('findOne', () => {
    it('should return a specific user', async () => {
      // Act
      const result = await usersService.findOne('1');

      // Assert
      expect(result).toEqual(usersEntityList[0]);
      expect(usersRepository.repository.findOneBy).toHaveBeenCalledWith({
        id: '1',
      });
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const error = new Error();
      jest
        .spyOn(usersRepository.repository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.findOne('1')).rejects.toThrow(error);
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const body: CreateUserDto = {
        id: '1',
        firstName: 'User',
        lastName: 'Name',
        gender: 'gender',
        birth: new Date('1999-01-01'),
        document: '0000000002',
        phone: '0000000002',
        email: 'mail@mail.com',
        password: '000000000',
        admin: false,
      };

      const tokens: ITokens = {
        access: 'token-acess',
        refresh: 'token-refresh',
      };

      const newUser: UserRegisterResponseDto = {
        id: '1',
        firstName: 'User',
        lastName: 'Name',
        gender: 'gender',
        birth: new Date('1999-01-01'),
        document: '0000000002',
        phone: '0000000002',
        email: 'mail@mail.com',
        admin: false,
        token: tokens,
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(newUser);

      // Act
      const result = await usersService.create(body);

      // Assert
      expect(result).toEqual(newUser);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const body: CreateUserDto = {
        id: '1',
        firstName: 'User',
        lastName: 'Name',
        gender: 'gender',
        birth: new Date('1999-01-01'),
        document: '0000000002',
        phone: '0000000002',
        email: 'mail@mail.com',
        password: '000000000',
        admin: false,
      };

      const error = new Error();
      jest
        .spyOn(usersRepository.repository, 'save')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.create(body)).rejects.toThrow(error);
    });
  });

  describe('update', () => {
    it('should update the user successfully', async () => {
      // Arrange
      const body: UpdateUserDto = {
        id: '1',
        firstName: 'User',
        lastName: 'Name',
        gender: 'gender',
        birth: new Date('1999-01-01'),
        document: '0000000003',
        phone: '0000000003',
        email: 'mail@mail.com',
        password: '000000000',
        admin: false,
      };

      // Act
      const result = await usersService.update('1', body);

      // Assert
      expect(result).toEqual(usersEntityList[0]);
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const body: UpdateUserDto = {
        id: '1',
        firstName: 'User',
        lastName: 'Name',
        gender: 'gender',
        birth: new Date('1999-01-01'),
        document: '0000000003',
        phone: '0000000003',
        email: 'mail@mail.com',
        password: '000000000',
        admin: false,
      };

      // Act
      const error = new Error();
      jest
        .spyOn(usersRepository.repository, 'update')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.update('1', body)).rejects.toThrow(error);
    });
  });

  describe('delete', () => {
    it('should delete the selected user', async () => {
      // Act
      const result = await usersService.remove('1');

      // Assert
      expect(result).toEqual(usersEntityList[0]);
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      jest
        .spyOn(usersRepository.repository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      const error = new Error();
      expect(usersService.remove('1')).rejects.toThrow(error);
    });
  });
});
