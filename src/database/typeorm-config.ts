import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';
config();

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: 'localhost',
      port: 3307,
      synchronize: false,
      type: 'mysql',
      entities: [join(__dirname, '..', '**/*entity.{ts,js}')],
      migrations: [join(__dirname, '..', './database/migrations/*{ts,js}')],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
