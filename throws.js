/**
 * The helper class for checking the input.
 * 
 * @class
 */
class Throws {
    /**
     * Throws an error if the given value is not a function.
     *
     * @param {*} fn - The value to check.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static notFunction = (fn, message) => {
        if ("function" !== typeof fn || !fn) {
            throw Error(message);
        }
    };

    /**
     * Throws an error if the given value is not a string.
     *
     * @param {*} str - The value to check.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static notString = (str, message) => {
        if ("string" !== typeof str) {
            throw Error(message);
        }
    };

    /**
     * Throws an error if the given string is empty.
     *
     * @param {string} str - The string to check.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static emptyString = (str, message) => {
        Throws.notString(str, message);

        if (0 === str.length) {
            throw Error(message);
        }
    };

    /**
     * Throws an error if the given value is not in the specified array.
     *
     * @param {*} val - The value to check.
     * @param {Array} arr - The array to check for the value.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static notInArray = (val, arr, message) => {
        if (-1 === arr.indexOf(val)) {
            throw Error(message);
        }
    };

    /**
     * Throws an error if the given value is not defined.
     * 
     * @param {*} val - The value to check.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static notDefined = function (val, message) {
        if (!val) {
            throw Error(message);
        }
    };

    /**
     * Throws an error if the object doesn't have property or function.
     * 
     * @param {Object} obj - The object to check.
     * @param {string} propName - The name of the property or function.
     * @param {string} message - The error message to throw.
     * @throws {Error}
     */
    static notHave = function (obj, propName, message) {
        if (!(propName in obj)) {
            throw Error(message);
        }
    };
}

module.exports = Throws;