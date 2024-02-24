export const sendSuccess = (
    message: string,
    code = 200,
    data?: Array<object> | object | number | string | null,
) => {
    return {
        success: true,
        message: message,
        code: code,
        data: data,
    };
};
