const globalErrHandler =  (err, req, res, next) => {
    console.log(err);

    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'Failed';
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({
        message,
        stack,
        status
    })
}

module.exports = globalErrHandler;