import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
//Aqui creamos las rutas
@Controller('users')
export class UsersController {
        constructor(private UsersService:UsersService){
        }
    //Principios de una ApiRest hay 4 tipos de petición
        //Get->Obtener
        //Post->Crear
        //Put Patch ->Actualizar
        //Delete ->Borrar

    @Post()//http://localhost:3000/users       ->Post
    create (@Body() user:CreateUserDto ){
        return this.UsersService.create(user);

    }
}