import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
//Aqui creamos todas las peticiones utilizando inyección de dependencias
//También creamos las operaciones //Crear, obtener por id, etc...
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository:Repository<User>
    ){}

//método para almacenar un nuevo usuario
create(user:CreateUserDto){
    const newUser=this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
}

}