const Parser = require("./parser");

function JsonParser() {
    Parser.call(this);
};
JsonParser.prototype = Object.create(Parser.prototype);

/**
 * Returns the possible content types to handle.
 * 
 * @returns {Array<string>} - The array of the possible content types.
 */
JsonParser.prototype.getContentTypes = function () {
    return [
        "application/json"
    ];
};

/**
 * Parses the request body.
 * 
 * @param {string} contentType - The content type of the request body.
 * @param {Buffer} body - The buffer data of the request body.
 * @param {Object} requestWrapper - The wrapper object of the request.
 */
JsonParser.prototype.parse = function (contentType, body, requestWrapper) {
    const charset = this.__getCharset(contentType);
    const json = JSON.parse(body.toString());

    requestWrapper.contentType = "application/json";
    requestWrapper.charset = charset;
    requestWrapper.content = json;
};

module.exports = JsonParser;