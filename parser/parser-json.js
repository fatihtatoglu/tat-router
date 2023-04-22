const Parser = require("./parser");

/**
 * The JSON body parser.
 * 
 * @class
 * @extends Parser
 */
class JsonParser extends Parser {

    getContentTypes() {
        return [
            "application/json"
        ];
    }

    parse(contentType, body, requestWrapper) {
        const charset = this._getCharset(contentType);
        const json = JSON.parse(body.toString());

        requestWrapper.contentType = "application/json";
        requestWrapper.charset = charset;
        requestWrapper.content = json;
    }
}

module.exports = JsonParser;