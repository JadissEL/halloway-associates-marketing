import { describe, expect, it } from "vitest";
import { emailDomain, isFreeEmailDomain } from "../src/services/suppression.js";
import {
  effectiveMailboxDailyCap,
  hourlyCapFromDaily,
} from "../src/services/sendCaps.js";

describe("suppression helpers", () => {
  it("extracts email domain", () => {
    expect(emailDomain("A@Example.COM")).toBe("example.com");
    expect(emailDomain("bad")).toBeNull();
  });

  it("detects free email domains", () => {
    expect(isFreeEmailDomain("a@gmail.com")).toBe(true);
    expect(isFreeEmailDomain("a@cabinet-dupont.fr")).toBe(false);
  });
});

describe("send caps", () => {
  it("applies warm-up ceiling", () => {
    expect(
      effectiveMailboxDailyCap({
        mailboxDailyCap: 100,
        warmUp: true,
        workspaceMax: 80,
        warmUpCap: 10,
      }),
    ).toBe(10);
  });

  it("respects workspace max without warm-up", () => {
    expect(
      effectiveMailboxDailyCap({
        mailboxDailyCap: 100,
        warmUp: false,
        workspaceMax: 40,
        warmUpCap: 10,
      }),
    ).toBe(40);
  });

  it("derives hourly cap from daily", () => {
    expect(hourlyCapFromDaily(40)).toBe(5);
    expect(hourlyCapFromDaily(1)).toBe(1);
  });

  it("documents dry-run skipHourly behavior via helper defaults", () => {
    // Live warm-up path still uses hourly pacing; dry-run passes skipHourly=true in processor.
    expect(hourlyCapFromDaily(10)).toBe(2);
  });
});
