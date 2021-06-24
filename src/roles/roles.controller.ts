import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from './../shared/custom-decorators/public.decorator';
import { Roles } from '../shared/custom-decorators/roles.decorator';

@Controller('roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) {}

  @Roles('moderator', 'admin')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.create(createRoleDto);
    return {
      ok: true,
      role
    };
  };

  @Public()
  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return {
      ok: true,
      roles
    };
  };

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    return {
      ok: true,
      role
    };
  };

  @Roles('admin')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesService.update(id, updateRoleDto);
    return {
      ok: true,
      role
    };
  };

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const role = await this.rolesService.remove(id);
    return {
      ok: true,
      role
    };
  };

  // Este router-handler es para crear los roles por defecto que tendrá la app
  // Pero luego me di cuenta que lo puedo hacer sin llamar a este enpoint
  // Llamando al metodo createRoles() en el main.ts, y es mejor de esa manera

  // @Post('/create-roles')
  // async createRoles(): Promise<string> {
  //   return await this.rolesService.createRoles();
  // }

}
