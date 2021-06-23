import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schema/role.schema';

@Injectable()
export class RolesService {

  constructor( @InjectModel(Role.name) private roleModel: Model<RoleDocument> ) { }


  async create(createRoleDto: CreateRoleDto) {
    return new this.roleModel(createRoleDto).save();
  };

  async findAll() {
    return this.roleModel.find().exec();
  };

  async findOne(id: string) {
    return this.roleModel.findById(id);
  };

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  };

  async remove(id: string) {
    return this.roleModel.findByIdAndDelete(id);
  };

  // Metodo que se llamará al iniciar la app, en el main.ts, y creará los roles por defecto
  async createRoles() {
    try {
      const count: number = await this.roleModel.estimatedDocumentCount();

      if (count > 0) {
        console.log('Roles have already been created')
        return 'Roles have already been created';
      };
  
      const values = await Promise.all([
        new this.roleModel({ name: 'user' }).save(),
        new this.roleModel({ name: 'moderator' }).save(),
        new this.roleModel({ name: 'admin' }).save()
      ]);
  
      console.log(values);
      return 'Roles have been created';

    } catch (error) {
      console.log(error);
    };
  };

  // Metodo para encontrar roles por nombre, me servirá para traer los roles que coincidan
  // con los roles mandados por un usuario nuevo
  async findRoles(roles: any[]) {
    return this.roleModel.find({ name: {$in: roles} });
  };

  // Metodo que me va a ayudar a establecer este rol 'user' por defecto a un usuario
  // en caso no mandé su rol
  async findUserRole() {
    return this.roleModel.findOne({ name: 'user' })
  };
}
