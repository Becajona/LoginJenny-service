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
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  // Obtener todos los usuarios
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // Obtener usuario por ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  // Actualizar usuario
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return await this.usersService.update(id, user);
  }

  // Eliminar usuario
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
