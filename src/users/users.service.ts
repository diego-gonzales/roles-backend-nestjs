import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { RolesService } from '../roles/roles.service';
import { RoleIdDto } from '../roles/dto/role-id.dto';

@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name) private userModel: Model<UserDocument>,
               private rolesService: RolesService ) { }


  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    // Hasheamos la contraseña antes de guardarla en la DB
    const salt = await bcrypt.genSalt();
    createdUser.password = await bcrypt.hash(createUserDto.password, salt);

    if (createUserDto.roles) {
      const foundRoles = await this.rolesService.findRoles(createUserDto.roles);
      // en caso el array de foundRoles venga vacio podriamos validarlo, pero si eso pasa entonces no se asigna ningun rol
      if (foundRoles.length <= 0) throw new BadRequestException('Role assign does not exists');

      createdUser.roles = foundRoles.map( role => role._id);
      console.log(createUserDto.roles);
    } else {
      const userRole = await this.rolesService.findUserRole();
      createdUser.roles = [userRole._id];
      console.log(createUserDto.roles);
    };

    return createdUser.save();
  };

  async findAll() {
    return this.userModel.find().exec();
  };

  async findById(id: string) {
    return this.userModel.findById(id);
  };

  // Metodo usado en AuthService para validar si existe un usuario para luego usarlo en el local-strategy
  async findOne(username: string) {
    return this.userModel.findOne({ username });
  };

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  };

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  };

  // Metodo que remueve un rol a un usuario
  async removeRoleToUser(idUser: string, roleIdDto: RoleIdDto) {
    // El try catch tambien los podemos manejar de este lado y ya no en el controlador (Es mejor acá a mi parecer)
    try {
      const { role_id } = roleIdDto;
  
      const userWithRemovedRole = await this.userModel.findByIdAndUpdate(idUser, {
        $pull: { roles: role_id }
      }, { new: true });

      if (!userWithRemovedRole) throw new NotFoundException('User does not exists');

      return userWithRemovedRole;

    } catch (error) {
      // Esto se disparará cuando mandemos un idUser que no tenga la forma de un ID de mongo (por defecto se manda error 500)
      // Osea ocurre un error dentro de mongo, por eso el error 500, no sería lo más conveniente este mensaje
      // en caso sea otro tipo de error de mongo
      throw new NotFoundException('User does not exists');
    };
  };

  async addRoleToUser(idUser: string, roleIdDto: RoleIdDto) {
    try {
      const { role_id } = roleIdDto;
  
      const userWithAddedRole = await this.userModel.findByIdAndUpdate(idUser, {
        $addToSet: { roles: role_id}
      },{ new: true });
  
      if (!userWithAddedRole) throw new NotFoundException('User does not exists');
  
      return userWithAddedRole;

    } catch (error) {
      // Esto se disparará cuando mandemos un idUser que no tenga la forma de un ID de mongo (por defecto se manda error 500)
      // Osea ocurre un error dentro de mongo, por eso el error 500, no sería lo más conveniente este mensaje
      // en caso sea otro tipo de error de mongo
      throw new NotFoundException('User does not exists');
    };
  };

}
