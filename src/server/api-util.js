var util = module.exports = {};

util.handleError = function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
};

util.validationError = function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        console.log('validationError', err, err.stack);
        res.status(statusCode).json(err);
    }
};