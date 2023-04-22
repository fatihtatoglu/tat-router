const Throws = require("./throws");

/**
 * The parameter finder regex.
 * 
 * @constant
 */
const PARAMETER_FINDER = /:\w+/g;

/**
 * The parameter replace regex.
 * 
 * @constant
 */
const PARAMETER_REPLACE = "([^/]+)";

/**
 * The optional parameter finder regex.
 * 
 * @constant
 */
const OPTIONAL_PARAMETER_FINDER = /:\w+\?/g;

/**
 * The optional parameter replace regex.
 * 
 * @constant
 */
const OPTIONAL_PARAMETER_REPLACE = "?([^/]*)";

/**
 * The route class.
 * 
 * @class
 */
class Route {

    /**
     * The path string to match the route.
     * @type {string}
     */
    #path;

    /**
     * The handler function to execute if the route matches.
     * @type {function}
     */
    #handler;

    /**
     * The regular expression pattern to match the URL against the route path.
     * @type {RegExp}
     */
    #patternRegEx;

    /**
     * Creates a new Route instance.
     * 
     * @constructor
     * @param {string} path - The path string to match the route.
     * @param {function} handler - The handler function to execute if the route matches.
     * @throws {Error} Invalid path.
     * @throws {Error} Invalid handler.
     */
    constructor(path, handler) {
        Throws.notString(path, "Invalid path.");
        Throws.emptyString(path, "Invalid path.");
        Throws.notFunction(handler, "Invalid handler.");

        this.#path = path;

        /**
         * The handler function to execute if the route matches.
         * @type {function}
         */
        this.#handler = handler;

        /**
         * The regular expression pattern to match the URL against the route path.
         * @type {RegExp}
         */
        this.#patternRegEx = new RegExp("^" + path.replace(OPTIONAL_PARAMETER_FINDER, OPTIONAL_PARAMETER_REPLACE).replace(PARAMETER_FINDER, PARAMETER_REPLACE) + "$");
    }

    /**
     * Checks if the given URL matches the route path.
     *
     * @param {string} url - The URL to match against the route path.
     * @returns {boolean} True if the URL matches the route path, false otherwise.
     * @throws {Error} Invalid url.
     */
    match(url) {
        Throws.notString(url, "Invalid url.");
        Throws.emptyString(url, "Invalid url.");

        return url.match(PARAMETER_FINDER) && url === this.#path ? !1 : this.#patternRegEx.test(url);
    }

    /**
     * Returns an object containing the parameters extracted from the URL, based on the route path.
     *
     * @param {string} url - The URL to extract parameters from.
     * @returns {object} An object containing the extracted parameters.
     * @throws {Error} Invalid url.
     */
    getParams(url) {
        Throws.notString(url, "Invalid url.");
        Throws.emptyString(url, "Invalid url.");

        let params = {};
        url = url.match(this.#patternRegEx);

        for (let e = this.#path.match(PARAMETER_FINDER) || [], d = 0; d < e.length; d++) {
            let c = e[d].substring(1);
            params[c] = url[d + 1];
        }

        return params;
    }

    /**
     * Executes the route.
     * 
     * @param {Request} request 
     * @param {ServerResponse} response 
     */
    execute(request, response) {
        this.#handler(request, response);
    }
}

module.exports = Route;