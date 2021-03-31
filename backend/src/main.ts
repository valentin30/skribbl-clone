import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SocketIoAdapter } from './adapters/socket-io.adapter'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.enableCors()

    app.useWebSocketAdapter(
        new SocketIoAdapter(app, ['http://localhost:3000', 'http://212.104.103.116:3000'])
    )

    await app.listen(4000)
}
bootstrap()
