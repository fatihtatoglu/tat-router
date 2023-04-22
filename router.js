const URL = require("url");
const Route = require("./route");
const Throws = require("./throws");
const METHODS = require("http").METHODS;
const Request = require("./request");

/**
 * Represents a router that can handle HTTP requests with specified routes and methods.
 * 
 * @class
 */
class Router {

    /**
     * The function to be executed when no matching route is found. 
     */
    #notFoundHandler;

    /**
     * Object that holds routes by their HTTP methods.
     *
     * @type {{Object.<string, Route[]>}}
     */
    #routes;

    /**
     * Object that holds the parser.
     *
     * @type {{Object.<string, Parser[]>}}
     */
    #parsers;

    /**
     * Initializes the router.
     * 
     * @constructor
     * @param {function} notFoundHandler - Function to be executed when no matching route is found.
     * @throws {Error} Invalid handler.
     */
    constructor(notFoundHandler) {
        Throws.notFunction(notFoundHandler, "Invalid handler.");

        this.#notFoundHandler = notFoundHandler;
        this.#routes = {};
        this.#parsers = {};
    }

    /**
     * Adds a new route to the router with specified method, path and handler.
     *
     * @param {string} method - HTTP method of the route.
     * @param {string} path - URL path of the route.
     * @param {function} handler - Function to be executed when the route is matched.
     * @throws {Error} Invalid method.
     */
    addRoute(method, path, handler) {
        Throws.notString(method, "Invalid method.");
        Throws.emptyString(method, "Invalid method.");
        Throws.notInArray(method, METHODS, "Invalid method. It should be one of the following. Valid methods: " + METHODS);

        this.#routes[method] || (this.#routes[method] = []);

        const route = new Route(path, handler);
        this.#routes[method].push(route);
    }

    /**
     * Adds a new parser to parse the body content for POST and PUT request.
     *
     * @param {Parser} parser - The parser class.
     * @throws {Error} Invalid parser.
     */
    addParser(parser) {
        Throws.notDefined(parser, "Invalid parser.");

        const that = this;
        parser.getContentTypes().forEach(type => {
            that.#parsers[type] = parser;
        });
    }

    /**
     * Navigates to the route that matches.
     *
     * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
     * @param {ServerResponse} res - The ServerResponse object represents the writable stream back to the client.
     * @throws {Error} Invalid request object.
     * @throws {Error} Invalid response object.
     */
    async navigate(req, res) {
        Throws.notDefined(req, "Invalid request object.");
        Throws.notHave(req, "method", "Invalid request object.");
        Throws.notHave(req, "url", "Invalid request object.");
        Throws.notHave(req, "headers", "Invalid request object.");
        Throws.notDefined(res, "Invalid response object.");

        const method = req.method;
        const url = req.url;

        if (!this.#routes[method]) {
            this.#notFoundHandler(res);
            return;
        }

        /** @type {string} */
        const contentType = req.headers["content-type"];

        /**
         * Gets the pathname to find the correct route definition.
         */
        const parsedUrl = URL.parse(url, !0);

        /** @type {string} */
        let pathName = parsedUrl.pathname;

        /**
         * Cleans the last '/' char.
         */
        1 < pathName.length && "/" === pathName[pathName.length - 1] && (pathName = pathName.slice(0, -1));

        var that = this;
        Promise
            .all([
                that.#getRoute(method, pathName),
                that.#getParser(method, contentType)
            ])
            .then(async (values) => {

                /** @type {Route} */
                const route = values[0];

                /** @type {Parser} */
                const parser = values[1];

                const request = Request.wrap(req, contentType, pathName, route, parser);

                route.execute(request, res);
            })
            .catch((error) => {
                that.#notFoundHandler(res);
            });
    }

    /**
     * Gets the parser.
     *
     * @param {string} method - The method of the request.
     * @param {string} contentType - The content type of the request.
     * @returns {Parser} - The parser constructor.
     * @private
     */
    #getParser(method, contentType) {
        const that = this;

        if (method !== "POST" && method !== "PUT") {
            return;
        }

        return new Promise((resolve, reject) => {
            for (const key in that.#parsers) {
                if (contentType.startsWith(key)) {
                    const parser = that.#parsers[key];
                    return resolve(parser);
                }
            }

            reject(new Error("The required parser is missing."));
        });
    }

    /**
     * Gets the route object.
     *
     * @param {string} method - The method of the request.
     * @param {string} pathname - The path of the requested URL.
     * @returns {Route} - The route object.
     * @private
     */
    #getRoute(method, pathname) {
        const that = this;

        return new Promise((resolve, reject) => {
            const routes = that.#routes[method];
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i];
                if (route.match(pathname)) {
                    return resolve(route);
                }
            }

            reject(new Error("The eligiable path not found."));
        });
    }
}

module.exports = Router;