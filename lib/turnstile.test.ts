import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("verifyTurnstile", () => {
  it("posts the token using Cloudflare's canonical form encoding", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "test-secret");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          hostname: "breakwaterbooking.com",
          action: "turnstile-spin-v2",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(verifyTurnstile("test-token", "203.0.113.7")).resolves.toBe(
      true,
    );

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    expect(options.headers).toEqual({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    expect(options.body).toBeInstanceOf(URLSearchParams);
    expect(String(options.body)).toBe(
      "secret=test-secret&response=test-token&remoteip=203.0.113.7",
    );
  });

  it("fails closed when siteverify is unavailable", async () => {
    vi.stubEnv("TURNSTILE_SECRET", "test-secret");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(verifyTurnstile("test-token", "203.0.113.7")).resolves.toBe(
      false,
    );
  });
});
