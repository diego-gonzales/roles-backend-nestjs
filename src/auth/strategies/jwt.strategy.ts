import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    // if (!payload) throw new UnauthorizedException('Invalid token')
    return { userId: payload.sub, username: payload.username, roles: payload.roles }; // previamente lo mandamos asi
    // Aqui podria buscar a un usuariopor su id y mandar el usuario completo en lugar de lo anterior
  };
}