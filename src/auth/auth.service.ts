import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor( private usersService: UsersService,
               private jwtService: JwtService ) {}


  async signUp(createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);

    const { _id, username, roles } = createdUser;
    
    const roleNameArray = roles.map( role => role.name );

    const payload = { username: username, sub: _id, roles: roleNameArray }

    return {
      _id,
      username,
      roles: roleNameArray,
      access_token: this.jwtService.sign(payload)
    };
  };

  // Metodo usado para la estrategia local de Passport (validar un usuario y su contraseña)
  async validateUser( username: string, password: string ) {
    const user = await this.usersService.findOne(username);

    if(!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    // if (user && isMatch) {
    //   // const { password, ...result } = user;
    //   // return result;
    //   return user;
    // };
    if(!isMatch) return null;

    return user;

  };

  async signin(user: UserDocument) {
    const { _id, username, roles } = user;
    
    const roleNameArray = roles.map( role => role.name );
    const payload = { username: username, sub: _id, roles: roleNameArray };
    console.log(payload);

    return {
      _id,
      username,
      roles: roleNameArray,
      access_token: this.jwtService.sign(payload)
    };
  };


  async renewToken(user: any) {
    const { userId, username, roles } = user;
    const payload = { username, sub: userId, roles };

    return {
      _id: userId,
      username,
      roles,
      access_token: this.jwtService.sign(payload)
    };
  };

}
