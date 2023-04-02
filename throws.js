const Throws = {};

/**
 * Throws an error if the given value is not a function.
 *
 * @param {*} fn - The value to check.
 * @param {string} message - The error message to throw if `fn` is not a function.
 * @throws {Error} - Throws an error with the specified message if `fn` is not a function.
 */
Throws.notFunction = (fn, message) => {
    if ("function" !== typeof fn || !fn) {
        throw Error(message);
    }
};

/**
 * Throws an error if the given value is not a string.
 *
 * @param {*} str - The value to check.
 * @param {string} message - The error message to throw if `str` is not a string.
 * @throws {Error} - Throws an error with the specified message if `str` is not a string.
 */
Throws.notString = (str, message) => {
    if ("string" !== typeof str) {
        throw Error(message);
    }
};

/**
 * Throws an error if the given string is empty.
 *
 * @param {string} str - The string to check.
 * @param {string} message - The error message to throw if `str` is empty.
 * @throws {Error} - Throws an error with the specified message if `str` is empty.
 */
Throws.emptyString = (str, message) => {
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
 * @param {string} message - The error message to throw if `val` is not in `arr`.
 * @throws {Error} - Throws an error with the specified message if `val` is not in `arr`.
 */
Throws.notInArray = (val, arr, message) => {
    if (-1 === arr.indexOf(val)) {
        throw Error(message);
    }
};

/**
 * Throws an error if the given value is not defined.
 * 
 * @param {*} val - The value to check.
 * @param {string} message - The error message to throw if `fn` is not defined.
 * @throws {Error} - Throws an error with the specified message if `fn` is not defined.
 */
Throws.notDefined = function (val, message) {
    if (!val) {
        throw Error(message);
    }
}

/**
 * Throws an error if the object doesn't have property or function.
 * 
 * @param {Object} obj - The object to check.
 * @param {string} propName - The name of the property or function.
 * @param {string} message - The error message to throw if the object doesn't have the property or function.
 * @throws {Error} - Throws an error with the specified message if `obj` doesn't have the property or function with given `propName`.
 */
Throws.notHave = function (obj, propName, message) {
    if (!(propName in obj)) {
        throw Error(message);
    }
};

/**
 * Throws an error if the url is not valid. This method only allows HTTP, HTTPS, and FTP.
 * 
 * @param {string} url - The url to check. 
 * @param {string} message - The error message to throw if the url is not valid.
 * @throws {Error} - Throws an error with the specified message if `url` is not valid.
 * @description -   After scaning the code with Synk, the validation of checking url is open ReDOS vulnerability. According to the following links this method is added.
 * {@link https://learn.snyk.io/lessons/redos/javascript/|ReDoS}
 * {@link https://snyk.io/blog/secure-javascript-url-validation/|Secure JavaScript URL validation}
 */
Throws.validURL = function (url, message) {
    let givenURL;

    try {
        givenURL = new URL(url);

        if (givenURL.protocol !== "http:" && givenURL.protocol !== "https:" && givenURL.protocol !== "ftp:") {
            throw Error(message);
        }
    }
    catch {
        throw Error(message);
    }
};

module.exports = Throws;