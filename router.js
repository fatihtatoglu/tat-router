const moduleUrl = require("url"),
    Route = require("./route"),
    Throws = require("./throws"),
    METHODS = require("http").METHODS;

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
}

/**
 * Adds a new route to the router with specified method, path and handler.
 * 
 * @param {string} method - HTTP method of the route.
 * @param {string} path - URL path of the route.
 * @param {function} handler - Function to be executed when the route is matched.
 * @throws {Error} Invalid method.
 */
Router.prototype.add = function (method, path, handler) {
    Throws.notString(method, "Invalid method.");
    Throws.emptyString(method, "Invalid method.");
    Throws.notInArray(method, METHODS, "Invalid method. It should be one of the following. Valid methods: " + METHODS);

    this.routes[method] || (this.routes[method] = []);

    const route = new Route(path, handler);
    this.routes[method].push(route);
};

/**
 * Navigates to the route that matches.
 * 
 * @param {IncomingMessage} req - The IncomingMessage object represents the request to the server.
 * @param {ServerResponse} res - The ServerResponse object represents the writable stream back to the client.
 * @throws {Error} Invalid request object.
 * @throws {Error} Invalid response object.
 * @throws {Error} Invalid method.
 * @throws {Error} Invalid url.
 */
Router.prototype.navigate = function (req, res) {

    Throws.notDefined(req, "Invalid request object.");
    Throws.notHave(req, "method", "Invalid request object.");
    Throws.notHave(req, "url", "Invalid request object.");

    Throws.notDefined(res, "Invalid response object.");

    const method = req.method;
    const url = req.url;

    if (!this.routes[method]) {
        this.notFoundHandler(res);
        return;
    }

    let b = moduleUrl.parse(url, !0), c = b.pathname;
    b = b.query;

    1 < c.length && "/" === c[c.length - 1] && (c = c.slice(0, -1));

    for (let g = this.routes[method], e = 0; e < g.length; e++) {
        let f = g[e];
        if (f.match(c)) {
            c = f.getParams(c);
            f.handler(res, c, b);
            return;
        }
    }

    this.notFoundHandler(res);
};

module.exports = Router;