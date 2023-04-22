const { describe, expect, it } = require("@jest/globals");
const Parser = require("../../parser/parser");

describe("Parser", () => {

    const SUT = new Parser();

    describe("validation", () => {
        it.each([
            [null],
            [123],
            [""]
        ])("should throw an error when the content type is not valid", (contentType) => {
            expect(() => { SUT.parse(contentType, null, null); }).toThrow("Invalid content type.");
        });

        it("should throw an error when body object is not defined", () => {
            expect(() => { SUT.parse("text/plain", null, null); }).toThrow("Invalid body object.");
        });

        it("should throw an error when body object is not defined", () => {
            expect(() => { SUT.parse("text/plain", null, null); }).toThrow("Invalid body object.");
        });
    });

    describe("_getCharset", () => {
        const defaultCharset = "UTF-8";

        it("should return the default charset when the charset is not provided", () => {
            const contentType = "text/plain";

            expect(defaultCharset).toEqual(SUT._getCharset(contentType));
        });

        it("should return the charset when the charset is provided", () => {
            const expectedCharset = "tat-router";
            const contentType = "text/plain;charset=" + expectedCharset;

            expect(expectedCharset).toEqual(SUT._getCharset(contentType));
        });
    });
});