const Throws = require("../throws");

/**
 * The parser abstract class.
 * 
 * @class
 */
class Parser {
    /**
     * Returns the possible content types to handle.
     *
     * @returns {Array<string>} - The array of the possible content types.
     * @abstract
     */
    getContentTypes() {
        return [""];
    }

    /**
     * Parses the request body.
     *
     * @param {string} contentType - The content type of the request body.
     * @param {Buffer} body - The buffer data of the request body.
     * @param {Object} requestWrapper - The wrapper object of the request.
     * @throws {Error} Invalid content type.
     * @throws {Error} Invalid body object.
     * @throws {Error} Invalid request wrapper object.
     * @abstract
     */
    parse(contentType, body, requestWrapper) {
        Throws.notString(contentType, "Invalid content type.");
        Throws.emptyString(contentType, "Invalid content type.");
        Throws.notDefined(body, "Invalid body object.");
        Throws.notDefined(requestWrapper, "Invalid request wrapper object.");
    }

    /**
     * Extracts the charset form the content type.
     *
     * @param {string} contentType - The content type of the request body.
     * @returns {string} - The charset of the content.
     * @protected
     */
    _getCharset(contentType) {
        let charset = "UTF-8";
        if (contentType.indexOf(";") !== -1) {
            const pairs = contentType.split(";");
            charset = pairs[1].slice(8);
        }

        return charset;
    }
}

module.exports = Parser;