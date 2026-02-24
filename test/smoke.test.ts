import { describe, expect, it } from "vitest";
import { add } from "../src/index.js";

describe("smoke", () => {
  it("adds numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
});
