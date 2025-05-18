class ApiHandler {
    static Success (res, status, message, data) {
        res.status(status).json({
            status: 'SUCCESS',
            message,
            data
        })
    }

    static Failed (res, status, message) {
        res.status(status).json({
            status: 'FAILED',
            message
        });
    }

    static serverError (res, status, message) {
        res.status(status).json({
            status: 'FAILED',
            message
        });
    }
}

module.exports = ApiHandler;