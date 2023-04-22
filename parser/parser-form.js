const Parser = require("./parser");

/**
 * The text body parser.
 * 
 * @class
 * @extends Parser
 */
class FormParser extends Parser {

    getContentTypes() {
        return [
            "application/x-www-form-urlencoded"
        ];
    }

    parse(contentType, body, requestWrapper) {
        body = body.toString();

        const charset = this._getCharset(contentType);
        const parameters = new URLSearchParams(body);

        requestWrapper.charset = charset;
        requestWrapper.fields = {};

        parameters.forEach((key, value) => {
            requestWrapper.fields[key] = value;
        });
    }
}

module.exports = FormParser;