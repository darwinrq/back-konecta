class BusinessError extends Error {
    constructor({
        code = undefined, httpCode = undefined, messages = ['Generic Error'],
    }) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.code = code;
        this.httpCode = httpCode;
        if (!Array.isArray(messages)) {
            let list = [];
            list.push(messages);
            messages = list;
        }

        this.messages = messages || ['Generic Error'];

    }
}

module.exports = BusinessError;