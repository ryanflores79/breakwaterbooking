import "server-only";

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

const TEST_SECRET = "1x0000000000000000000000000000000AA";

export async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("TURNSTILE_SECRET_KEY is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: secret ?? TEST_SECRET,
          response: token,
          remoteip: remoteIp || undefined,
          idempotency_key: crypto.randomUUID(),
        }),
        signal: controller.signal,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;
    const allowedHosts = new Set([
      "breakwaterbooking.com",
      "www.breakwaterbooking.com",
      ...(process.env.NODE_ENV === "production"
        ? []
        : ["localhost", "127.0.0.1"]),
    ]);

    return (
      result.success &&
      (!result.hostname || allowedHosts.has(result.hostname)) &&
      (!result.action || result.action === "booking-inquiry")
    );
  } finally {
    clearTimeout(timeout);
  }
}
