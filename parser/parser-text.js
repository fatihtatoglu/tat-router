const Parser = require("./parser"),
    Throws = require("../throws");

function TextParser() {
    Parser.call(this);
};
TextParser.prototype = Object.create(Parser.prototype);

/**
 * Returns the possible content types to handle.
 * 
 * @returns {Array<string>} - The array of the possible content types.
 */
TextParser.prototype.getContentTypes = function () {
    return [
        "text/plain"
    ];
};

/**
 * Parses the request body.
 * 
 * @param {string} contentType - The content type of the request body.
 * @param {Buffer} body - The buffer data of the request body.
 * @param {Object} requestWrapper - The wrapper object of the request.
 * @throws {Error} Invalid content type.
 * @throws {Error} Invalid body object.
 * @throws {Error} Invalid request wrapper object.
 */
TextParser.prototype.parse = function (contentType, body, requestWrapper) {
    Throws.notString(contentType, "Invalid content type.");
    Throws.emptyString(contentType, "Invalid content type.");
    Throws.notDefined(body, "Invalid body object.");
    Throws.notDefined(requestWrapper, "Invalid request wrapper object.");

    body = body.toString();

    const charset = this.__getCharset(contentType);

    requestWrapper.contentType = "text/plain";
    requestWrapper.charset = charset;
    requestWrapper.content = body;
};

module.exports = TextParser;