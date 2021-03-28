import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppGateway } from './gateways/app.gateway'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { RoomGateway } from './gateways/room.gateway'
import { UserGateway } from './gateways/user.gateway'
import { UserService } from './services/user.service'
import { RoomService } from './services/room.service'
import { GameGateway } from './gateways/game.gateway'
import { GameService } from './services/game.service'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        })
    ],
    providers: [
        AppGateway,
        RoomGateway,
        UserGateway,
        UserService,
        RoomService,
        GameGateway,
        GameService
    ]
})
export class AppModule {}
