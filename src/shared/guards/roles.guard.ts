import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../custom-decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }


  canActivate( context: ExecutionContext ): boolean {
    const requiredRoles: string[] = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) return true; // sino se manda ningul rol en el decorador para revisar entonces simplemente pasa

    const request = context.switchToHttp().getRequest();
    const user = request.user; // el 'user' no viene de un body, sino del token deserealizado

    return requiredRoles.some( role => user.roles?.includes(role) );
    
    // Si no se encuentra los roles necesarios por defecto se enviará un Fobidden exception
    // Pero podemos manejar la línea 19 y mandar un error diferente si es 'false'
  };
}
