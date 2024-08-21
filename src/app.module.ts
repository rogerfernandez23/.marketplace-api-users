import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { HateoasIndex } from './core/hateoas/hateoas-index';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { MeModule } from './modules/me/me.module';
import { TokenModule } from './modules/tokens/token.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AddressModule,
    AuthModule,
    MeModule,
    TokenModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'http://localhost:3000',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HateoasIndex],
})
export class AppModule {}
