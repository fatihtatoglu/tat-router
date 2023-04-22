const Parser = require("./parser");

/**
 * The text body parser.
 * 
 * @class
 * @extends Parser
 */
class FileParser extends Parser {

    getContentTypes() {
        return [
            "multipart/form-data"
        ];
    }

    parse(contentType, body, requestWrapper) {
        body = body.toString();

        const boundary = contentType.split(";")[1].split("=")[1];
        const parts = body.split(`--${boundary}`);

        requestWrapper.files = [];

        for (let i = 1; i < parts.length - 1; i++) {
            const part = parts[i];

            const filenameMatch = /filename="(.*)"/.exec(part);
            const contentTypeMatch = /Content-Type: (.*)/.exec(part);
            const filename = filenameMatch[1];
            const fileContentType = contentTypeMatch[1];

            const fileContent = part.substring(part.indexOf("\r\n\r\n") + 4, part.length - 2);
            const buff = Buffer.from(fileContent);

            requestWrapper.files.push({
                name: filename,
                contentType: fileContentType,
                size: Buffer.byteLength(buff),
                buffer: buff
            });
        }
    }
}

module.exports = FileParser;