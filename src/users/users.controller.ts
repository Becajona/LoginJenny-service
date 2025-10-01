import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Param, 
  ParseIntPipe, 
  Put, 
  Delete 
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from '../auth/dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Crear usuario
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  // Obtener todos los usuarios
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Obtener usuario por ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // Actualizar usuario
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  // Eliminar usuario
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
