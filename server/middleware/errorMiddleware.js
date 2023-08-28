const errorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Something went wrong';
    err.statusCode = err.statusCode || 500;

    if (err instanceof errorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    //For unhandled errors
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

module.exports = errorMiddleware;