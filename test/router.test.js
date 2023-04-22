const { describe, expect, it, beforeEach } = require("@jest/globals");
const METHODS = require("http").METHODS;
const Router = require("../router");

function createRequest(method, url) {
    return {
        method: method,
        url: "http://localhost" + url,
        headers: {
            "content-type": "text/plain"
        }
    };
}

describe("Router", () => {
    describe("constructor validation", () => {
        it("should throw an error if handler is not a function", () => {
            expect(() => new Router(undefined)).toThrow("Invalid handler.");
        });

        it("should not throw an error if handler is a function", () => {
            expect(() => { new Router(jest.fn()); }).not.toThrow();
        });
    });

    describe("addRoute validations", () => {
        const SUT = new Router(jest.fn());

        const notStringMethod = 123;
        const emptyStringMethod = "";
        const invalidMethod = "ROUTER";
        const path = "/hello";
        const handler = jest.fn();

        it("should throw an error if the method is not string", () => {
            expect(() => { SUT.addRoute(notStringMethod, path, handler); }).toThrow("Invalid method.");
        });

        it("should throw an error if the method is empty string", () => {
            expect(() => { SUT.addRoute(emptyStringMethod, path, handler); }).toThrow("Invalid method.");
        });

        it("should throw an error if the method is invalid", () => {
            expect(() => { SUT.addRoute(invalidMethod, path, handler); }).toThrow("Invalid method. It should be one of the following. Valid methods: " + METHODS);
        });
    });

    describe("addRoute", () => {
        it("should add a new route", () => {
            /**
             * @type {Router}
             */
            const SUT = new Router(() => { });

            const path = "/users/:id";
            const handler = () => { };
            expect(() => { SUT.addRoute("GET", path, handler); }).not.toThrow();
        });
    });

    describe("static route", () => {

        const notFoundHandler = () => { };

        const SUT = new Router(notFoundHandler);

        const mockRequest = {
            url: "http://localhost/static/app.js",
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                Connection: "keep-alive",
                Host: "localhost:8080",
                "content-type": "text/plain"
            },
            query: {}
        };

        const staticHandler = jest.fn();

        let response = {};

        it("should handle", () => {

            SUT.addRoute("GET", "/static/app.js", staticHandler);

            SUT.navigate(mockRequest, response);

            expect(staticHandler).toBeCalled();
        });
    });

    // describe("navigate validation", () => {
    //     /**
    //      * @type {Router}
    //      */
    //     const SUT = new Router(jest.fn());

    //     const validRequest = createRequest("GET", "/path");

    //     // it.each([
    //     //     [null],
    //     //     [{}],
    //     //     [{ method: "GET" }],
    //     //     [{ url: "http://localhost/" }]
    //     // ])("should throw an error if request is not valid", (request) => {
    //     //     expect(() => { router.navigate(request); }).toThrow("Invalid request object.");
    //     // });

    //     // it("should throw an error if the response is not defined", () => {
    //     //     expect(() => { router.navigate(validRequest, null); }).toThrow("Invalid response object.");
    //     // });
    // });

    // describe("navigate", () => {
    //     const notFoundHandler = jest.fn();
    //     const response = {};

    //     /**
    //      * @type {Router}
    //      */
    //     let SUT;

    //     beforeEach(() => {
    //         SUT = new Router(notFoundHandler);
    //     });

    //     it("should call notFoundHandler when route is not added", () => {
    //         const request = createRequest("GET", "/");
    //         SUT.navigate(request, response);

    //         expect(notFoundHandler).toHaveBeenCalled();
    //     });

    //     it("should call the appropriate route handler when a matching route is found", () => {
    //         const method = "GET";
    //         const path = "/example/:id";
    //         const handler = jest.fn();
    //         SUT.addRoute(method, path, handler);

    //         const request = createRequest("GET", "/example/123");

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { id: "123" }, {});
    //     });

    //     it("should remove the pathname ends with / char", () => {
    //         const method = "GET";
    //         const path = "/example/:id";
    //         const handler = jest.fn();
    //         SUT.addRoute(method, path, handler);

    //         const request = createRequest("GET", "/example/123/");

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { id: "123" }, {});
    //     });

    //     it("should call the notFoundHandler when a route does not defined", () => {
    //         const method = "GET";
    //         const path = "/example";
    //         const handler = jest.fn();
    //         SUT.addRoute(method, path, handler);

    //         const request = createRequest("GET", "/hello");

    //         SUT.navigate(request, response);

    //         expect(notFoundHandler).toHaveBeenCalled();
    //         expect(handler).not.toHaveBeenCalled();
    //     });
    // });
});
