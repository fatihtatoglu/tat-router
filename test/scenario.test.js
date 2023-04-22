const { describe, expect, it, beforeEach } = require("@jest/globals");
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

describe("Scenario", () => {

    const notFoundHandler = jest.fn();

    let SUT;

    let response = {};

    beforeEach(() => {
        SUT = new Router(notFoundHandler);
    });

    it("empty", () => {

    });

    // describe("static path", () => {

    //     const staticHandler = jest.fn((res) => {
    //         res.content = "static-content";
    //     });

    //     it.each([
    //         ["GET", "/static/app.js", staticHandler, createRequest("GET", "/static/app.js"), response, {}, {}],
    //         ["GET", "/static/app.js", staticHandler, createRequest("GET", "/static/app.js?v=20230329"), response, {}, { v: "20230329" }]
    //     ])("should return static path", (method, path, handler, req, result, params, query) => {
    //         SUT.addRoute(method, path, handler);

    //         SUT.navigate(req, response);

    //         expect(handler).toBeCalled();
    //     });
    // });

    // describe("parameterless", () => {
    //     it("should return content", () => {
    //         const handler = jest.fn();
    //         const request = createRequest("GET", "/");

    //         SUT.addRoute("GET", "/", handler);

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, {}, {});
    //     });

    //     it("should return content with query string", () => {
    //         const handler = jest.fn();
    //         const request = createRequest("GET", "?token=abc");

    //         SUT.addRoute("GET", "/", handler);

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, {}, { token: "abc" });
    //     });
    // });

    // describe("with parameter", () => {

    //     const handler = jest.fn();

    //     it.each([
    //         ["GET", "/orders/:orderId", createRequest("GET", "/orders/123"), response, { orderId: "123" }, {}],
    //         ["GET", "/:id/orders", createRequest("GET", "/124/orders"), response, { id: "124" }, {}],
    //         ["POST", "/merchantId/:merchantId/orderId/:orderId/orderStatus", createRequest("POST", "/merchantId/12/orderId/3456/orderStatus"), response, { merchantId: "12", orderId: "3456" }, {}],
    //         ["PUT", "/menu/:merchantId", createRequest("PUT", "/menu/123"), response, { merchantId: "123" }, {}],
    //         ["PUT", "/menu/:merchantId", createRequest("PUT", "/menu/123?key=value"), response, { merchantId: "123" }, { key: "value" }],
    //     ])("should return the parameter with key", (method, path, req, result, params, query) => {
    //         SUT.addRoute(method, path, handler);

    //         SUT.navigate(req, response);

    //         expect(handler).toHaveBeenCalledWith(result, params, query);
    //     });

    //     it("should call notFoundHandler when path and url is same", () => {
    //         const request = createRequest("GET", "/orders/:orderId");
    //         const handler = jest.fn();

    //         SUT.addRoute("GET", "/orders/:orderId", handler);

    //         SUT.navigate(request, response);

    //         expect(notFoundHandler).toHaveBeenCalledWith(response);
    //         expect(handler).not.toHaveBeenCalled();
    //     });
    // });

    // describe("advanced case", () => {
    //     const request = createRequest("GET", "/flights/TUR-SAW-ASC-5");
    //     const handler = jest.fn();

    //     it("should define routes in correct order", () => {
    //         SUT.addRoute("GET", "/flights/:from-:to-:orderBy-:top", handler);
    //         SUT.addRoute("GET", "/flights/:from-:to-:orderBy", handler);
    //         SUT.addRoute("GET", "/flights/:from-:to", handler);

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { from: "TUR", to: "SAW", orderBy: "ASC", top: "5" }, {});
    //     });

    //     it("should not define routes in correct order", () => {
    //         SUT.addRoute("GET", "/flights/:from-:to", handler);
    //         SUT.addRoute("GET", "/flights/:from-:to-:orderBy", handler);
    //         SUT.addRoute("GET", "/flights/:from-:to-:orderBy-:top", handler);

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { from: "TUR-SAW-ASC", to: "5" }, {});
    //     });
    // });

    // describe("optional parameters", () => {
    //     let handler;

    //     beforeEach(() => {
    //         handler = jest.fn();
    //     });

    //     it("should handle the optional parameter", () => {
    //         SUT.addRoute("GET", "/users/:userId/posts/:postId?", handler);

    //         const request = createRequest("GET", "/users/123/posts/456");

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { userId: "123", postId: "456" }, {});
    //     });

    //     it("should skip optional parameter", () => {
    //         SUT.addRoute("GET", "/users/:userId/posts/:postId?", handler);

    //         const request = createRequest("GET", "/users/123/posts");

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { userId: "123", postId: "" }, {});
    //     });

    //     it.each([
    //         [createRequest("GET", "/users/123/posts/456?token=abc&limit=15"), response, { userId: "123", postId: "456" }, { token: "abc", limit: "15" }],
    //         [createRequest("GET", "/users/123/posts?token=abc&limit=15"), response, { userId: "123", postId: "" }, { token: "abc", limit: "15" }]
    //     ])("should handle query string with optional parameters", (request, result, params, query) => {
    //         SUT.addRoute("GET", "/users/:userId/posts/:postId?", handler);

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(result, params, query);
    //     });

    //     it.each([
    //         ["/users/:userId?-:orderBy?"],
    //         ["/users/:userId?/:orderBy?"]
    //     ])("should handle multiple optional parameter", (path) => {
    //         SUT.addRoute("GET", path, handler);

    //         const request = createRequest("GET", "/users");

    //         SUT.navigate(request, response);

    //         expect(handler).toHaveBeenCalledWith(response, { userId: "", orderBy: "" }, {});
    //     });
    // });
});