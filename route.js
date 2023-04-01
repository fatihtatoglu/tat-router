const Throws = require("./throws"),
    PARAMETER_FINDER = /:\w+/g,
    PARAMETER_REPLACE = "([^/]+)",
    OPTIONAL_PARAMETER_FINDER = /:\w+\?/g,
    OPTIONAL_PARAMETER_REPLACE = "?([^/]*)";

/**
 * Creates a new Route instance.
 * 
 * @constructor
 * @param {string} path - The path string to match the route.
 * @param {function} handler - The handler function to execute if the route matches.
 * @throws {Error} Invalid path.
 * @throws {Error} Invalid handler.
 */
function Route(path, handler) {
    Throws.notString(path, "Invalid path.");
    Throws.emptyString(path, "Invalid path.");
    Throws.notFunction(handler, "Invalid handler.");

    /**
     * The path string to match the route.
     * @type {string}
     */
    this.path = path;

    /**
     * The handler function to execute if the route matches.
     * @type {function}
     */
    this.handler = handler;

    /**
     * The regular expression pattern to match the URL against the route path.
     * @type {RegExp}
     */
    this.patternRegEx = new RegExp("^" + path.replace(OPTIONAL_PARAMETER_FINDER, OPTIONAL_PARAMETER_REPLACE).replace(PARAMETER_FINDER, PARAMETER_REPLACE) + "$");
}

/**
 * Checks if the given URL matches the route path.
 * 
 * @param {string} url - The URL to match against the route path.
 * @returns {boolean} True if the URL matches the route path, false otherwise.
 * @throws {Error} Invalid url.
 */
Route.prototype.match = function (url) {
    Throws.notString(url, "Invalid url.");
    Throws.emptyString(url, "Invalid url.");

    return url.match(PARAMETER_FINDER) && url === this.path ? !1 : this.patternRegEx.test(url);
};

/**
 * Returns an object containing the parameters extracted from the URL, based on the route path.
 * 
 * @param {string} url - The URL to extract parameters from.
 * @returns {object} An object containing the extracted parameters.
 * @throws {Error} Invalid url.
 */
Route.prototype.getParams = function (url) {
    Throws.notString(url, "Invalid url.");
    Throws.emptyString(url, "Invalid url.");

    var params = {};
    url = url.match(this.patternRegEx);

    for (var e = this.path.match(PARAMETER_FINDER) || [], d = 0; d < e.length; d++) {
        var c = e[d].substring(1);
        params[c] = url[d + 1];
    }

    return params;
};

module.exports = Route;