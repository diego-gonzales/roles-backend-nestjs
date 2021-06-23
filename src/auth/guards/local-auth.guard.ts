import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// Este guard solo servirá para verificar si el username y contraseña son válidos
// Es decir solo para nuestro 'signin'