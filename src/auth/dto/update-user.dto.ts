import { IsOptional, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser un texto' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El apellido no puede superar los 50 caracteres' })
  lastname?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'El teléfono debe tener exactamente 10 dígitos' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser un texto' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'El token debe ser un texto' })
  notification_token?: string;
}
