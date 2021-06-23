import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './shared/custom-decorators/roles.decorator';
import { RolesGuard } from './shared/guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async signIn( @Request() req) {
  //     return this.authService.signin(req.user)
  // }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // user que envia el jwtstrategy si el token es correcto (deserealiza el token)
  }
}
