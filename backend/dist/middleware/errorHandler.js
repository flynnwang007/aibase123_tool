"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.errors
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    if (err.name === 'MulterError') {
        return res.status(400).json({
            message: 'File Upload Error',
            error: err.message
        });
    }
    return res.status(err.statusCode || 500).json({
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map