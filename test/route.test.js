const { describe, expect, it } = require("@jest/globals");
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
        const SUT = new Route("/hello", () => { });

        it("should throw an error if url is not a string", () => {
            expect(() => SUT.match(undefined)).toThrow("Invalid url.");
        });

        it("should throw an error if url is an empty string", () => {
            expect(() => SUT.match("")).toThrow("Invalid url.");
        });
    });

    describe("match", () => {
        const SUT = new Route("/hello", () => { });

        it("should return false if url does not match path", () => {
            expect(SUT.match("/world")).toBe(false);
        });

        it("should return true if url matches path exactly", () => {
            expect(SUT.match("/hello")).toBe(true);
        });
    });

    describe("match with parameter", () => {
        const SUT = new Route("/hello/:name", () => { });

        it("should return true if url matches path with parameters", () => {
            expect(SUT.match("/hello/world")).toBe(true);
        });

        it("should return false if url does not match path with parameters", () => {
            expect(SUT.match("/user/123")).toBe(false);
        });

        it("should return false if url is equal to path", () => {
            expect(SUT.match("/hello/:name")).toBe(false);
        });
    });

    describe("getParams validation", () => {
        const SUT = new Route("/hello/:name", () => { });

        it("should throw an error if url is not a string", () => {
            expect(() => SUT.getParams(undefined)).toThrow("Invalid url.");
        });

        it("should throw an error if url is an empty string", () => {
            expect(() => SUT.getParams("")).toThrow("Invalid url.");
        });
    });

    describe("getParams", () => {
        it("should return an object with the parameters from the url", () => {
            const SUT = new Route("/hello/:name/age/:age", () => { });
            expect(SUT.getParams("/hello/world/age/25")).toEqual({ name: "world", age: "25" });
        });

        it("should return an empty object from the parameterless url", () => {
            const SUT = new Route("/", () => { });
            expect(SUT.getParams("/")).toEqual({});
        });
    });
});
