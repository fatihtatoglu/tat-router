const Parser = require("./parser");

/**
 * The text body parser.
 * 
 * @class
 * @extends Parser
 */
class TextParser extends Parser {

    getContentTypes() {
        return [
            "text/plain"
        ];
    }

    parse(contentType, body, requestWrapper) {
        super.parse(contentType, body, requestWrapper);

        const charset = this._getCharset(contentType);

        requestWrapper.contentType = "text/plain";
        requestWrapper.charset = charset;
        requestWrapper.content = body.toString();
    }
}

module.exports = TextParser;