import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterResponseDto } from './dto/register-user.dto';
import { ITokens } from '../auth/strategies/jwt-tokens.interface';
import { UpdateUserDto } from './dto/update-user.dto';

const usersEntityList: Users[] = [
  new Users({ id: '1', firstName: 'User1', phone: '000000000' }),
  new Users({ id: '2', firstName: 'User2', phone: '000000001' }),
  new Users({ id: '3', firstName: 'User3', phone: '000000002' }),
];

const newUsersEntityList = new Users({
  id: '1',
  firstName: 'User',
  phone: '000000002',
});

const updatedUsersEntity = new Users({
  id: '1',
  firstName: 'User',
  phone: '000000003',
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUsersEntityList),
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedUsersEntity),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return list of all users', async () => {
      // Arrange
      const expectResult = { users: usersEntityList };

      // Act
      const result = await usersController.findAll();

      // Assert
      expect(result).toEqual(expectResult);
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const error = new Error();
      jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findAll()).rejects.toThrow(error);
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
      const result = await usersController.create(body);

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
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.create(body)).rejects.toThrow(error);
    });
  });

  describe('findOne', () => {
    it('should return a specific user', async () => {
      // Act
      const result = await usersController.findOne('1');

      // Assert
      expect(result).toEqual(usersEntityList[0]);
      expect(usersService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      const error = new Error();
      jest.spyOn(usersController, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findOne).rejects.toThrow(error);
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
      const result = await usersController.update('1', body);

      // Assert
      expect(result).toEqual(updatedUsersEntity);
      expect(usersService.update).toHaveBeenCalledWith('1', body);
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
      jest.spyOn(usersController, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.update('1', body)).rejects.toThrow(error);
    });
  });

  describe('remove', () => {
    it('should delete the selected user', async () => {
      // Act
      const result = await usersController.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception in case of error', () => {
      // Arrange
      jest.spyOn(usersController, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      const error = new Error();
      expect(usersController.remove('1')).rejects.toThrow(error);
    });
  });
});
