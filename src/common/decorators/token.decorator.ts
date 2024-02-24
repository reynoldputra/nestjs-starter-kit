import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const Token = createParamDecorator(
    async (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const token = request.headers?.authorization ?? null;

        if (token.split(' ').length < 2)
            throw new UnauthorizedException('Invalid Token');

        const jwtService = new JwtService();

        const bearerToken = token.split(' ')[1];
        const decoded = jwtService.decode(bearerToken);

        return data ? decoded?.[data] : false;
    },
);
