import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  };

  // ESTA ESTRATEGIA DEVOLVERÁ EL TOKEN DESEREALIZADO Y LO ASIGNARA COMO 'USER' A LA REQUEST
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles }; // previamente lo mandamos asi
  };
}