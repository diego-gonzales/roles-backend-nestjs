import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../../shared/custom-decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // Esto lo hacemos para poner excluir a rutas que tengan el decorador '@Public'

    constructor(private reflector: Reflector) {
        super();
    };

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        return super.canActivate(context);
    };

    
};

// ESTE GUARD SERVIRÁ PARA PROTEGER NUESTRAS RUTAS QUE CREAMOS NECESARIAS
// LO ESTABLECIMOS DE FORMA GLOBAL PARA TODAS LAS RUTAS, PERO CCREAMOS UN
// DECORADOR PERSONALIZADO '@PUBLIC' Y LO VALIDAMOS AQUI CON EL REFLECTOR
// PARA EVITAR QUE DICHAS RUTAS CON EL @Public pidan un token (/get, /get:id)