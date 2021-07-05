import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './../shared/custom-decorators/public.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  // En este caso le pongo public al signup porque un usuario al registrarse no va a necesitar un token
  @Public()
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const access_token = await this.authService.signUp(createUserDto);
    return access_token;
    // try {

    // } catch (error) {
    //   /*se disparará un error 500 si es que en nuestro body mandamos un username o email que ya se
    //   encuentra registrado, esto debido a que en nuestro schema user, el campo username y password
    //   son 'uniques'. El otro error que se puede disparar es cuando los roles enviados no coinciden
    //   con los de la DB*/
    //   throw error;
    // };
  };

  @UseGuards(LocalAuthGuard) // me devuelve un 'user' en la req si pasa el guard, sino una 'exception'
  @Public()
  @Post('/signin')
  async signIn(@Request() req) {
    const access_token = await this.authService.signin(req.user); // user que envia el localstrategy si las credenciales son correctas
    return access_token;
  };

  // Este método renovará mi token siempre y cuando el token sea válido (manejado por mi JWTGuard global)
  @Get('/renew-token')
  async renewToken(@Request() req) {
    const userInfo = this.authService.renewToken(req.user);
    return userInfo;
  };
}
