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
    
    const roleNameArray = createdUser.roles.map( role => role.name );

    const payload = { username: createdUser.username, sub: createdUser._id, roles: roleNameArray }

    return {
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
    const roleNameArray = user.roles.map( role => role.name );
    const payload = { username: user.username, sub: user._id, roles: roleNameArray };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload)
    };
  };

}
