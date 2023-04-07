const Parser = require("./parser/parser");
const Route = require("./route");
const moduleUrl = require("url");

var Request = {};

/**
 * Creates the wrapper object for request.
 * 
 * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
 * @param {Route} route - The route object.
 * @param {Parser} parser - The parser object.
 */
Request.wrap = async function (req, contentType, pathname, route, parser) {

    /**
     * Reads the request body.
     * 
     * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
     * @returns {Buffer} - The body buffer.
     */
    function __getBody(req) {
        return new Promise((resolve, reject) => {
            try {
                const chunks = [];
                req.on("data", chunk => chunks.push(chunk));
                req.on("end", () => {
                    const body = Buffer.concat(chunks);
                    resolve(body);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    const parsedUrl = moduleUrl.parse(req.url, !0);

    const pathParams = route.getParams(pathname);

    let obj = {
        url: req.url,
        method: req.method,
        header: req.headers,

        query: parsedUrl.query,
        path: pathParams
    };

    if (parser) {
        const buffer = await __getBody(req);
        parser.parse(contentType, buffer, obj);
    }

    return obj;
};

module.exports = Request;