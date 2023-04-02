const Router = require("../router"),
    { describe, expect } = require("@jest/globals"),
    METHODS = require("http").METHODS;

function createRequest(method, url) {
    return {
        method: method,
        url: "http://localhost" + url
    };
}

describe("Router", () => {
    describe("constructor validation", () => {
        it("should throw an error if handler is not a function", () => {
            expect(() => new Router(undefined)).toThrow("Invalid handler.");
        });

        it("should not throw an error if handler is a function", () => {
            expect(() => { new Router(jest.fn()) }).not.toThrow();
        });
    });

    describe("add validations", () => {
        const router = new Router(jest.fn());

        const notStringMethod = 123;
        const emptyStringMethod = "";
        const invalidMethod = "ROUTER";
        const path = "/hello";
        const handler = jest.fn();

        it("should throw an error if the method is not string", () => {
            expect(() => { router.add(notStringMethod, path, handler) }).toThrow("Invalid method.");
        });

        it("should throw an error if the method is empty string", () => {
            expect(() => { router.add(emptyStringMethod, path, handler) }).toThrow("Invalid method.");
        });

        it("should throw an error if the method is invalid", () => {
            expect(() => { router.add(invalidMethod, path, handler) }).toThrow("Invalid method. It should be one of the following. Valid methods: " + METHODS);
        });
    });

    describe("add", () => {
        it("should add a new route", () => {
            const router = new Router(() => { });
            const path = "/users/:id";
            const handler = () => { };
            router.add("GET", path, handler);
            expect(router.routes["GET"]).toHaveLength(1);
            expect(router.routes["GET"][0].path).toBe(path);
            expect(router.routes["GET"][0].handler).toBe(handler);
        });
    });

    describe("navigate validation", () => {
        const router = new Router(jest.fn());

        const validRequest = createRequest("GET", "/path");

        it.each([
            [null],
            [{}],
            [{ method: "GET" }],
            [{ url: "http://localhost/" }]
        ])("should throw an error if request is not valid", (request) => {
            expect(() => { router.navigate(request); }).toThrow("Invalid request object.");
        });

        it("should throw an error if the response is not defined", () => {
            expect(() => { router.navigate(validRequest, null); }).toThrow("Invalid response object.");
        });
    });

    describe("navigate", () => {
        const notFoundHandler = jest.fn();
        const response = {};

        let router;

        beforeEach(() => {
            router = new Router(notFoundHandler);
        });

        it('should call notFoundHandler when route is not added', () => {
            const request = createRequest("GET", "/");
            router.navigate(request, response);

            expect(notFoundHandler).toHaveBeenCalled();
        });

        it('should call the appropriate route handler when a matching route is found', () => {
            const method = 'GET';
            const path = '/example/:id';
            const handler = jest.fn();
            router.add(method, path, handler);

            const request = createRequest("GET", "/example/123");

            router.navigate(request, response);

            expect(handler).toHaveBeenCalledWith(response, { id: '123' }, {});
        });

        it('should remove the pathname ends with / char', () => {
            const method = 'GET';
            const path = '/example/:id';
            const handler = jest.fn();
            router.add(method, path, handler);

            const request = createRequest("GET", "/example/123/");

            router.navigate(request, response);

            expect(handler).toHaveBeenCalledWith(response, { id: '123' }, {});
        });

        it('should call the notFoundHandler when a route does not defined', () => {
            const method = 'GET';
            const path = '/example';
            const handler = jest.fn();
            router.add(method, path, handler);

            const request = createRequest("GET", "/hello");

            router.navigate(request, response);

            expect(notFoundHandler).toHaveBeenCalled();
            expect(handler).not.toHaveBeenCalled();
        });
    });
});
