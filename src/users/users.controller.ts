import { Controller,
         Get,
         Post,
         Body,
         Patch,
         Param,
         Delete,
         NotFoundException,
         BadRequestException
       } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from './../shared/custom-decorators/public.decorator';
import { RoleIdDto } from '../roles/dto/role-id.dto';
import { Roles } from '../shared/custom-decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('moderator', 'admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return {
        ok: true,
        user: createdUser
      };

    } catch (error) {
      // se dispara porque en nuestro esquema username y contraseña son 'uniques'
      throw new BadRequestException('Username or email have already been registered');
    };
  };

  @Public()
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      ok: true,
      users
    };
  };

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const userFound = await this.usersService.findById(id);

      if (!userFound) throw new NotFoundException('User does not exists');

      return {
        ok: true,
        user: userFound
      };

    } catch (error) {
      // Se dispara cuando el id proporcionado no es de la forma de un id de mongo
      throw new NotFoundException('User does not exists');
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);

      if (!updatedUser) throw new NotFoundException('User does not exists');

      return {
        ok: true,
        user: updatedUser
      };

    } catch (error) {
      throw new NotFoundException('User does not exists');
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.remove(id);

      if (!deletedUser) throw new NotFoundException('User does not exists');

      return {
        ok: true,
        user: deletedUser
      };

    } catch (error) {
      throw new NotFoundException('User does not exists');
    };
  };

  // Los siguientes métodos manejadores de rutas son para eliminarle y agregarle un role a un usuario
  @Roles('admin')
  @Patch('remove-role/:idUser')
  async removeRoleToUser(@Param('idUser') idUser: string, @Body() roleIdDto: RoleIdDto) {
    const userWithRemovedRole = await this.usersService.removeRoleToUser(idUser, roleIdDto);
    return {
      ok: true,
      user: userWithRemovedRole
    };
  };

  @Roles('admin')
  @Patch('add-role/:idUser')
  async addRoleToUser(@Param('idUser') idUser: string, @Body() roleIdDto: RoleIdDto) {
    const userWithAddedRole = await this.usersService.addRoleToUser(idUser, roleIdDto);
    return {
      ok: true,
      user: userWithAddedRole
    };
  };

}
