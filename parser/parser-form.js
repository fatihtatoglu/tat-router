const Parser = require("./parser");

function FormParser() {
    Parser.call(this);
};
FormParser.prototype = Object.create(Parser.prototype);

/**
 * Returns the possible content types to handle.
 * 
 * @returns {Array<string>} - The array of the possible content types.
 */
FormParser.prototype.getContentTypes = function () {
    return [
        "application/x-www-form-urlencoded"
    ];
};

/**
 * Parses the request body.
 * 
 * @param {string} contentType - The content type of the request body.
 * @param {Buffer} body - The buffer data of the request body.
 * @param {Object} requestWrapper - The wrapper object of the request.
 */
FormParser.prototype.parse = function (contentType, body, requestWrapper) {
    body = body.toString();

    const charset = this.__getCharset(contentType);
    const parameters = new URLSearchParams(body);

    requestWrapper.charset = charset;
    requestWrapper.fields = {};

    parameters.forEach((key, value) => {
        requestWrapper.fields[key] = value;
    });
};

module.exports = FormParser;