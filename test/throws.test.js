const { describe, expect } = require("@jest/globals");
const Throws = require("../throws");

describe("Throws", () => {

    describe("notFunction", () => {
        it("should throw an error if fn is not a function", () => {
            expect(() => Throws.notFunction("not a function", "fn must be a function")).toThrow("fn must be a function");
        });

        it("should not throw an error if fn is a function", () => {
            expect(() => Throws.notFunction(() => { }, "fn must be a function")).not.toThrow();
        });
    });

    describe("notString", () => {
        it("should throw an error if str is not a string", () => {
            expect(() => Throws.notString(123, "str must be a string")).toThrow("str must be a string");
        });

        it("should throw an error if str is not a string", () => {
            expect(() => Throws.notString(null, "str must be a string")).toThrow("str must be a string");
        });

        it("should not throw an error if str is a string", () => {
            expect(() => Throws.notString("hello", "str must be a string")).not.toThrow();
        });
    });

    describe("emptyString", () => {
        it("should throw an error if str is an empty string", () => {
            expect(() => Throws.emptyString("", "str cannot be empty")).toThrow("str cannot be empty");
        });

        it("should not throw an error if str is not an empty string", () => {
            expect(() => Throws.emptyString("hello", "str cannot be empty")).not.toThrow();
        });
    });

    describe("notInArray", () => {
        it("should throw an error if val is not in the array", () => {
            expect(() => Throws.notInArray(4, [1, 2, 3], "val must be in the array")).toThrow("val must be in the array");
        });

        it("should not throw an error if val is in the array", () => {
            expect(() => Throws.notInArray(3, [1, 2, 3], "val must be in the array")).not.toThrow();
        });
    });

    describe("notDefined", () => {
        it.each([
            [""],
            [undefined],
            [null]
        ])("should throw an error if val is not defined", (val) => {
            expect(() => Throws.notDefined(val, "val must be defined")).toThrow("val must be defined");
        });

        it.each([
            ["sample"],
            [1234]
        ])("should not throw an error if val is defined", (val) => {
            expect(() => Throws.notDefined(val, "val must be defined")).not.toThrow();
        });
    });

    describe("notHave", () => {

        /**
         * This is the fake class to test the case.
         */
        class temp {
            constructor() {
                this.val = "";
            }
            method() { }
        };

        it.each([
            [{}, "firstname"],
            [{ version: 1.0 }, "firstname"],
            [{ print: function () { } }, "firstname"],
            [new temp(), "print"]
        ])("should throw an error if the object doesn't have the function or property.", (obj, propName) => {
            expect(() => Throws.notHave(obj, propName, "Invalid object")).toThrow("Invalid object");
        });

        it.each([
            [{ firstname: "fatih" }, "firstname"],
            [new temp(), "val"],
            [new temp(), "method"]
        ])("should not throw an error if the object has the function or property.", (obj, propName) => {
            expect(() => Throws.notHave(obj, propName, "Invalid object")).not.toThrow();
        });
    });
});
() => { }