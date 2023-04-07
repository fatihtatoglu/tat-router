const moduleUrl = require("url"),
    Route = require("./route"),
    Throws = require("./throws"),
    METHODS = require("http").METHODS,
    Parser = require("./parser/parser"),
    Request = require("./request");

/**
 * Represents a router that can handle HTTP requests with specified routes and methods.
 * 
 * @constructor
 * @param {function} notFoundHandler - Function to be executed when no matching route is found.
 * @throws {Error} Invalid handler.
 */
function Router(notFoundHandler) {
    Throws.notFunction(notFoundHandler, "Invalid handler.");

    /**
     * The function to be executed when no matching route is found.
     * 
     * @type {function}
     */
    this.notFoundHandler = notFoundHandler;

    /**
     * Object that holds routes by their HTTP methods.
     * 
     * @type {Object}
     */
    this.routes = {};

    /**
     * Object that holds the parser.
     * 
     * @type {Object}
     */
    this.parsers = {};
}

/**
 * Adds a new route to the router with specified method, path and handler.
 * 
 * @param {string} method - HTTP method of the route.
 * @param {string} path - URL path of the route.
 * @param {function} handler - Function to be executed when the route is matched.
 * @throws {Error} Invalid method.
 */
Router.prototype.addRoute = function (method, path, handler) {
    Throws.notString(method, "Invalid method.");
    Throws.emptyString(method, "Invalid method.");
    Throws.notInArray(method, METHODS, "Invalid method. It should be one of the following. Valid methods: " + METHODS);

    this.routes[method] || (this.routes[method] = []);

    const route = new Route(path, handler);
    this.routes[method].push(route);
};

/**
 * Adds a new parser to parse the body content for POST and PUT request.
 *  
 * @param {Parser} parser - The parser class.
 * @throws {Error} Invalid parser.
 */
Router.prototype.addParser = function (parser) {
    Throws.notDefined(parser, "Invalid parser.");

    /**
     * @type {Parser}
     */
    const parserInstance = new parser();

    const that = this;
    parserInstance.getContentTypes().forEach(type => {
        that.parsers[type] = parserInstance;
    });
};

/**
 * Navigates to the route that matches.
 * 
 * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
 * @param {ServerResponse} res - The ServerResponse object represents the writable stream back to the client.
 * @throws {Error} Invalid request object.
 * @throws {Error} Invalid response object.
 */
Router.prototype.navigate = async function (req, res) {
    Throws.notDefined(req, "Invalid request object.");
    Throws.notHave(req, "method", "Invalid request object.");
    Throws.notHave(req, "url", "Invalid request object.");
    Throws.notHave(req, "headers", "Invalid request object.");

    Throws.notDefined(res, "Invalid response object.");

    const method = req.method;
    const url = req.url;

    if (!this.routes[method]) {
        this.notFoundHandler(res);
        return;
    }

    /**
     * Gets the content type to find eligible parser.
     * @type {string}
     */
    const contentType = req.headers["content-type"];

    /**
     * Gets the pathname to find the correct route definition.
     */
    const parsedUrl = moduleUrl.parse(url, !0);

    /**
     * @type {string}
     */
    let pathName = parsedUrl.pathname;

    /**
     * Cleans the last '/' char.
     */
    1 < pathName.length && "/" === pathName[pathName.length - 1] && (pathName = pathName.slice(0, -1));

    var that = this;
    Promise
        .all([
            that.__getRoute(method, pathName),
            that.__getParser(method, contentType)
        ])
        .then(async (values) => {

            /**
             * @type {Route}
             */
            const route = values[0];

            /**
             * @type {Parser}
             */
            const parser = values[1];

            const request = await Request.wrap(req, contentType, pathName, route, parser);

            route.handler(request, res);
        })
        .catch((error) => {
            that.notFoundHandler(res);
        });
};

/**
 * Gets the parser.
 * 
 * @param {string} method - The method of the request.
 * @param {string} contentType - The content type of the request.
 * @returns {Parser} - The parser constructor.
 * @private
 */
Router.prototype.__getParser = function (method, contentType) {
    const that = this;

    if (method !== "POST" && method !== "PUT") {
        return;
    }

    return new Promise((resolve, reject) => {
        for (const key in that.parsers) {
            if (contentType.startsWith(key)) {
                const parser = that.parsers[key];
                return resolve(parser);
            }
        }

        reject(new Error("The required parser is missing."));
    });
};

/**
 * Gets the route object.
 * 
 * @param {string} method - The method of the request.
 * @param {string} pathname - The path of the requested URL.
 * @returns {Route} - The route object.
 * @private
 */
Router.prototype.__getRoute = function (method, pathname) {
    const that = this;

    return new Promise((resolve, reject) => {
        const routes = that.routes[method];
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.match(pathname)) {
                return resolve(route);
            }
        }

        reject(new Error("The eligiable path not found."));
    });
};

module.exports = Router;