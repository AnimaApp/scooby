import { isValidName } from "../src/reports/name";

describe("naming", () => {
  it("validates names correctly", () => {
    expect(isValidName("valid")).toBeTruthy();
    expect(isValidName("valid-name")).toBeTruthy();
    expect(isValidName("valid-123")).toBeTruthy();
    expect(isValidName("VALID")).toBeTruthy();
    expect(isValidName("Valid")).toBeTruthy();

    expect(isValidName("invalid name")).toBeFalsy();
    expect(isValidName("invalid/")).toBeFalsy();
    expect(isValidName("@invalid")).toBeFalsy();
    expect(isValidName("invalid.name")).toBeFalsy();
  });
});
