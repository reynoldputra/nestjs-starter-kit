import { SetMetadata } from '@nestjs/common';

export const changeResponseMessage = (msg: string | number) => {
    SetMetadata('response_message', msg);
};
