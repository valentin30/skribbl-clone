import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './config/typeorm-config.service'
import { AppGateway } from './gateways/app.gateway'
import { ChatGateway } from './gateways/chat.gateway'
import { DrawGateway } from './gateways/draw.gateway'
import { GameGateway } from './gateways/game.gateway'
import { RoomGateway } from './gateways/room.gateway'
import { UserGateway } from './gateways/user.gateway'
import { ChatService } from './services/chat.service'
import { DrawService } from './services/draw.service'
import { GameService } from './services/game.service'
import { RoomService } from './services/room.service'
import { UserService } from './services/user.service'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        })
    ],
    providers: [
        AppGateway,
        UserGateway,
        RoomGateway,
        GameGateway,
        DrawGateway,
        ChatGateway,
        UserService,
        RoomService,
        GameService,
        DrawService,
        ChatService
    ]
})
export class AppModule {}
