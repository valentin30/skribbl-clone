import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets'
import { BAD_INPUT_DATA } from 'src/util/error-messages'

@Catch(BadRequestException)
export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const properError: WsException = new WsException(BAD_INPUT_DATA)
        super.catch(properError, host)
    }
}
