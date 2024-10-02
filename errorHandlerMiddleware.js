const errorHadlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const errorObj = {
        message:'Something broke!!',
        err: err.message
    }
    res.status(500).send(errorObj);
}

module.exports = errorHadlerMiddleware;