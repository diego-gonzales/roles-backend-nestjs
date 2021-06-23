import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  };

  // ESTA ESTRATEGIA DEVOLVERÁ UN 'USER' ASIGNADO A LA REQUEST
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Username or password are invalid')
    return user;
  };

}