import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { SalesModule } from './sales/sales.module';

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
    // usar el nombre de contenedor de docker para la conexion a la base de datos en lugar de localhost
    MongooseModule.forRoot('mongodb://roles-database-1:27017/nest-roles-jwt', {
      useFindAndModify: false,
      useCreateIndex: true,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    SharedModule,
    CustomersModule,
    CategoriesModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
