import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(
        message: string,
        statusCode: number,
        options?: HttpExceptionOptions,
    ) {
        super(
            message,
            statusCode,
            options ?? { cause: new Error('Some Error') },
        );
    }
}
