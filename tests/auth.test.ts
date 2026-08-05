import { beforeEach, describe, expect, it } from "vitest";

import { getLoginDelay, recordLoginFailure, resetLoginThrottle } from "@/lib/auth/throttle";

describe("login throttle", () => {
  beforeEach(() => resetLoginThrottle());
  it("delays after five failures and caps the delay", () => {
    for (let attempt = 0; attempt < 4; attempt += 1) expect(recordLoginFailure("ip", attempt)).toBe(0);
    expect(recordLoginFailure("ip", 4)).toBe(500);
    for (let attempt = 5; attempt < 20; attempt += 1) recordLoginFailure("ip", attempt);
    expect(getLoginDelay("ip", 20)).toBeLessThanOrEqual(8_000);
  });
});
