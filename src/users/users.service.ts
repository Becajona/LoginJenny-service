import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // Crear usuario (si no lo manejas desde /auth/register)
  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  // Obtener todos los usuarios (sin password)
  async findAll() {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...u }) => u);
  }

  // Obtener un usuario por ID
  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    // quitar password antes de devolver
    const { password, ...rest } = user;
    return rest;
  }

  // Actualizar usuario por ID
  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ id });

    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, user);
    return await this.usersRepository.save(updatedUser);
  }

  // Eliminar usuario por ID
  async remove(id: number) {
    const userFound = await this.usersRepository.findOneBy({ id });

    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return await this.usersRepository.delete({ id });
  }
}
