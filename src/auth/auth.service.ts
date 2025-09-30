import { HttpException, HttpStatus, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: RegisterAuthDto) {
    const { email, phone } = userDto;

    const emailExist = await this.usersRepository.findOne({ where: { email } });
    if (emailExist) {
      throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
    }

    const phoneExist = await this.usersRepository.findOne({ where: { phone } });
    if (phoneExist) {
      throw new HttpException('El teléfono ya existe', HttpStatus.CONFLICT);
    }

    // El hash se hace en @BeforeInsert() del entity
    const newUser = this.usersRepository.create(userDto);
    const saved = await this.usersRepository.save(newUser);

    const { password, ...userWithoutPassword } = saved;
    return userWithoutPassword;
  }

  async login(loginData: LoginAuthDto) {
    const { email, password } = loginData;

    const userFound = await this.usersRepository.findOne({ where: { email } });
    if (!userFound) {
      // Puedes usar mensaje genérico para no filtrar si existe el email
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: userFound.id, email: userFound.email, name: userFound.name };
    const token = this.jwtService.sign(payload);

    const { password: _pwd, ...userWithoutPassword } = userFound;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
