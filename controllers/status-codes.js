let errors = {
    InternalServerError: () => {
        return {
            "errors": {
                code: 500,
                message: 'Internal Server Error'
            }
        };
    },

    NotFound: (message, params) => {
        let response = {
            code: 404,
            message: message || 'Not Found'
        };

        if (params) {
            for (let param in params) {
                response[param] = params[param];
            }
        }

        return {
            "errors": response
        };
    },

    BadRequest: (message, params) => {
        let response = {
            code: 400,
            message: message || 'Bad request'
        };

        if (params) {
            for (let param in params) {
                response[param] = params[param];
            }
        }

        return {
            "errors": response
        };
    },

    Conflict: (message, params) => {
        let response = {
            code: 409,
            message: message || 'Conflict'
        };

        if (params) {
            for (let param in params) {
                response[param] = params[param];
            }
        }

        return {
            "errors": response
        };
    }
}

let success = {
    Success: (message, params) => {
        let response = {
            code: 200,
            message: message || 'Success'
        };

        if (params) {
            for (let param in params) {
                response[param] = params[param];
            }
        }

        return response;
    }
}

module.exports = {
    success,
    errors
}