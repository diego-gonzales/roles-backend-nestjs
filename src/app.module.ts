import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true // establecer esta opcion en true o importarlo en cada modulo necesario
    }),
    MongooseModule.forRoot('mongodb://localhost/nest-roles-jwt', {
      useFindAndModify: false,
      useCreateIndex: true,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
