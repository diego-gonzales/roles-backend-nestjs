import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public } from './../shared/custom-decorators/public.decorator';

@Controller('roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) {}


  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.rolesService.create(createRoleDto);
      return {
        ok: true,
        role
      };

    } catch (error) {
      // se dispara porque en nuestro esquema el nombre del rol es 'unique'
      throw new BadRequestException('Role has already been created');
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
    try {
      const role = await this.rolesService.findOne(id);

      if (!role) throw new NotFoundException('Role does not exists');

      return {
        ok: true,
        role
      };

    } catch (error) {
      throw new NotFoundException('Role does not exists');
    };
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.rolesService.update(id, updateRoleDto);

      if (!role) throw new NotFoundException('Role does not exists');

      return {
        ok: true,
        role
      };

    } catch (error) {
      throw new NotFoundException('Role does not exists');
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const role = await this.rolesService.remove(id);

      if (!role) throw new NotFoundException('Role does not exists');

      return {
        ok: true,
        role
      };

    } catch (error) {
      throw new NotFoundException('Role does not exists');
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
