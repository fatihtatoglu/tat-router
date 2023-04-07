const { describe, expect } = require("@jest/globals");
const TextParser = require("../../parser/parser-text");

describe("Text Parser", () => {

    /**
     * @type {TextParser}
     */
    const parser = new TextParser();

    describe("getContentTypes", () => {
        it("should return a specific array", () => {
            const result = parser.getContentTypes();

            expect(result).toHaveLength(1);
            expect(result).toContain("text/plain");
        });
    });

    describe("validation", () => {
        it.each([
            [null],
            [123],
            [""]
        ])("should throw an error when the content type is not valid", (contentType) => {
            expect(() => { parser.parse(contentType, null, null); }).toThrow("Invalid content type.")
        });

        it("should throw an error when body object is not defined", () => {
            expect(() => { parser.parse("text/plain", null, null); }).toThrow("Invalid body object.");
        });

        it("should throw an error when body object is not defined", () => {
            expect(() => { parser.parse("text/plain", null, null); }).toThrow("Invalid body object.");
        });
    });

    describe("parse", () => {
        it("should parse the content", () => {
            const expctedText = "lorem ipsum sit amet.";

            const contentType = "content-type;charset=charset";
            const body = Buffer.from(expctedText);

            let result = {};

            parser.parse(contentType, body, result);

            expect(result).toMatchObject({
                contentType: "text/plain",
                content: expctedText,
                charset: "charset"
            });
        });
    });
});