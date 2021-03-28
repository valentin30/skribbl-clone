import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SocketIoAdapter } from './adapters/socket-io.adapter'
import { AppModule } from './app.module'
import { BadRequestTransformationFilter } from './filters/bad-request.filter'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.enableCors()

    app.useWebSocketAdapter(new SocketIoAdapter(app, ['http://localhost:3000']))

    await app.listen(4000)
}
bootstrap()
