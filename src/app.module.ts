import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dmidecimo25',
      database: 'e_commercebd',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],//aqui vamos agregando las entidades que tengan .entity
      synchronize: true,
    }),
    UsersModule,
    
  ],
  })

export class AppModule {}
