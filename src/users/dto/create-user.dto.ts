import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CreateRoleDto } from '../../roles/dto/create-role.dto';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    roles: CreateRoleDto[]; // Debería tener un tipado, creo que es de tipo CreateRoleDto, estaba con any
}
