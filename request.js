const URL = require("url");

/**
 * The request wrapper object.
 * 
 * @class
 */
class Request {

    /**
     * Creates the wrapper object for request.
     *
     * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
     * @param {Route} route - The route object.
     * @param {Parser} parser - The parser object.
     */
    static wrap(req, contentType, pathname, route, parser) {

        const parsedUrl = URL.parse(req.url, !0);

        const pathParams = route.getParams(pathname);

        const obj = {
            url: req.url,
            method: req.method,
            header: req.headers,

            query: parsedUrl.query,
            path: pathParams
        };

        // TODO: debug...
        if (parser) {
            const buffer = Request.#getBody(req);
            parser.parse(contentType, buffer, obj);
        }

        return obj;
    }

    /**
     * Reads the request body.
     *
     * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
     * @returns {Buffer} - The body buffer.
     */
    static #getBody(req) {
        return new Promise((resolve, reject) => {
            try {
                const chunks = [];
                req.on("data", (chunk) => chunks.push(chunk));
                req.on("end", () => {
                    const body = Buffer.concat(chunks);
                    resolve(body);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Request;