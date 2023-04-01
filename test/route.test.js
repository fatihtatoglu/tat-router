const { describe, expect } = require("@jest/globals");
const Route = require("../route");

describe("Route", () => {

    describe("constructor", () => {
        it("should throw an error if path is not a string", () => {
            expect(() => new Route(undefined, () => { })).toThrow("Invalid path.");
        });

        it("should throw an error if path is an empty string", () => {
            expect(() => new Route("", () => { })).toThrow("Invalid path.");
        });

        it("should throw an error if handler is not a function", () => {
            expect(() => new Route("/hello", undefined)).toThrow("Invalid handler.");
        });
    });

    describe("match validation", () => {
        const route = new Route("/hello", () => { });

        it("should throw an error if url is not a string", () => {
            expect(() => route.match(undefined)).toThrow("Invalid url.");
        });

        it("should throw an error if url is an empty string", () => {
            expect(() => route.match("")).toThrow("Invalid url.");
        });
    });

    describe("match", () => {
        const route = new Route("/hello", () => { });

        it("should return false if url does not match path", () => {
            expect(route.match("/world")).toBe(false);
        });

        it("should return true if url matches path exactly", () => {
            expect(route.match("/hello")).toBe(true);
        });
    });

    describe("match with parameter", () => {
        const route = new Route("/hello/:name", () => { });

        it("should return true if url matches path with parameters", () => {
            expect(route.match("/hello/world")).toBe(true);
        });

        it("should return false if url does not match path with parameters", () => {
            expect(route.match("/user/123")).toBe(false);
        });

        it("should return false if url is equal to path", () => {
            expect(route.match("/hello/:name")).toBe(false);
        });
    });

    describe("getParams validation", () => {
        const route = new Route("/hello/:name", () => { });

        it("should throw an error if url is not a string", () => {
            expect(() => route.getParams(undefined)).toThrow("Invalid url.");
        });

        it("should throw an error if url is an empty string", () => {
            expect(() => route.getParams("")).toThrow("Invalid url.");
        });
    });

    describe("getParams", () => {
        const route = new Route("/hello/:name", () => { });

        it("should return an object with the parameters from the url", () => {
            const route = new Route("/hello/:name/age/:age", () => { });
            expect(route.getParams("/hello/world/age/25")).toEqual({ name: "world", age: "25" });
        });

        it("should return an empty object from the parameterless url", () => {
            const route = new Route("/", () => { });
            expect(route.getParams("/")).toEqual({});
        });
    });
});
