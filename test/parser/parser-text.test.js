const { describe, expect, it } = require("@jest/globals");
const TextParser = require("../../parser/parser-text");

describe("Text Parser", () => {

    const SUT = new TextParser();

    describe("getContentTypes", () => {
        it("should return a specific array", () => {
            const result = SUT.getContentTypes();

            expect(result).toHaveLength(1);
            expect(result).toContain("text/plain");
        });
    });

    describe("parse", () => {
        it("should parse the content", () => {
            const expctedText = "lorem ipsum sit amet.";

            const contentType = "content-type;charset=charset";
            const body = Buffer.from(expctedText);

            let result = {};

            SUT.parse(contentType, body, result);

            expect(result).toMatchObject({
                contentType: "text/plain",
                content: expctedText,
                charset: "charset"
            });
        });
    });
});