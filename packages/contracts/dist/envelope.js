export function successResponse(data, meta) {
    return {
        data,
        meta,
        success: true,
    };
}
export function errorResponse(code, message, details, meta) {
    return {
        data: null,
        error: {
            code,
            details,
            message,
        },
        meta,
        success: false,
    };
}
//# sourceMappingURL=envelope.js.map