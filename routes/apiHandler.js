/**
 * helper for rest api
 * resolves Promise returning services to json responses
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} req
 * @param {Promise} serviceP
 * @returns {Promise} promise to resolve service result to response
 */
function apiHandler(req, res, serviceP) {
    return serviceP.then(constructResponse)
        .catch(function (error) {
            console.error("Error at API Handler : ", error);
            return constructErrorResponse(error)
        }).then(function (result) {
            res.status(result.status).send(result.body);
        });
}

/**
 * constructs response using successfull result of service
 * @param {*} serviceResult
 * @returns {Object} object with 'result' and success 'status'
 */
function constructResponse(serviceResult) {
    var result = {
        'body': serviceResult || null,
        'status': 200
    };
    return result;
}

/**
 * constructs response using successfull result of service
 * @param {*} errorObject
 * @returns {Object} object with 'result' and success 'status'
 */
function constructErrorResponse(errorObject) {
    var result = {
        'body': errorObject.message || errorObject || null,
        'status': errorObject.statusCode || 422
    };
    return result;
}

module.exports = {
    apiHandler
}