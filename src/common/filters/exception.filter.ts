import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';

interface ErrorResponse {
    success: boolean;
    status: HttpStatus;
    message: string;
    error?: unknown;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let validationError: ValidationError[] = [];

        console.log(exception);

        if (exception instanceof HttpException) {
            if (
                exception.getResponse()['message'] &&
                exception.getResponse()['message'][0] instanceof ValidationError
            ) {
                validationError = exception.getResponse()['message'];
            }

            message = exception.message;
            httpStatus = exception.getStatus();
        }

        const responseBody: ErrorResponse = {
            success: false,
            status: httpStatus,
            message,
        };

        if (validationError.length) responseBody.error = validationError;

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
