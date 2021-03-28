import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            synchronize: true,
            dropSchema: false,
            logging: true,
            cache: true,
            entities: [__dirname + '/../**/*.entity.{js,ts}']
        }
    }
}
