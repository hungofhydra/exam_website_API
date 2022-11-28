export const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || 'Something went wrong';
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
        statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        statusCode = 400;
    }
    res.status(statusCode).json({ success: 'false', statusCode, message });
};
