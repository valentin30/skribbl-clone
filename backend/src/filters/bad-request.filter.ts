import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'

@Catch(BadRequestException)
export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const properError: WsException = new WsException('Bad Request Exception')
        super.catch(properError, host)
    }
}
