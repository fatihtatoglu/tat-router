/* istanbul ignore file */

/**
 * The parser interface. To guide for the body parser classes.
 * 
 * @constructor
 */
function Parser() { };

/**
 * Returns the possible content types to handle.
 * 
 * @returns {Array<string>} - The array of the possible content types.
 */
Parser.prototype.getContentTypes = function () { };

/**
 * Parses the request body.
 * 
 * @param {string} contentType - The content type of the request body.
 * @param {Buffer} body - The buffer data of the request body.
 * @param {Object} requestWrapper - The wrapper object of the request.
 */
Parser.prototype.parse = function (contentType, body, requestWrapper) { };

/**
 * Extracts the charset form the content type.
 * 
 * @param {string} contentType - The content type of the request body.
 * @returns {string} - The charset of the content.
 * @private
 */
Parser.prototype.__getCharset = function (contentType) {
    let charset = "UTF-8";
    if (contentType.indexOf(';') !== -1) {
        const pairs = contentType.split(';');
        charset = pairs[1].slice(8);
    }

    return charset;
};

module.exports = Parser;