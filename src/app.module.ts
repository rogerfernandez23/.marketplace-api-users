import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersService } from './modules/users/users.service';
import { UsersMapper } from './modules/users/mapper/users.mapper';
import { UsersRepository } from './modules/users/repositories/users.repository';
import { UsersController } from './modules/users/users.controller';
import { HateoasIndex } from './core/hateoas/hateoas-index';
import { UrlGeneratorModule } from 'nestjs-url-generator';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AddressModule,
    AuthModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'http://localhost:3000',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HateoasIndex],
})
export class AppModule {}
