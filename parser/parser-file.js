const Parser = require("./parser");

function FileParser() {
    Parser.call(this);
};
FileParser.prototype = Object.create(Parser.prototype);

/**
 * Returns the possible content types to handle.
 * 
 * @returns {Array<string>} - The array of the possible content types.
 */
FileParser.prototype.getContentTypes = function () {
    return [
        "multipart/form-data"
    ];
};

/**
 * Parses the request body.
 * 
 * @param {string} contentType - The content type of the request body.
 * @param {Buffer} body - The buffer data of the request body.
 * @param {Object} requestWrapper - The wrapper object of the request.
 */
FileParser.prototype.parse = function (contentType, body, requestWrapper) {
    body = body.toString();

    const boundary = contentType.split(';')[1].split('=')[1];
    const parts = body.split(`--${boundary}`);

    requestWrapper.files = [];

    for (let i = 1; i < parts.length - 1; i++) {
        const part = parts[i];

        const filenameMatch = /filename="(.*)"/.exec(part);
        const contentTypeMatch = /Content-Type: (.*)/.exec(part);
        const filename = filenameMatch[1];
        const fileContentType = contentTypeMatch[1];

        const fileContent = part.substring(part.indexOf('\r\n\r\n') + 4, part.length - 2);
        const buff = Buffer.from(fileContent);

        requestWrapper.files.push({
            name: filename,
            contentType: fileContentType,
            size: Buffer.byteLength(buff),
            buffer: buff
        });
    }
};

module.exports = FileParser;