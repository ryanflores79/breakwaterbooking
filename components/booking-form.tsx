"use client";

import Script from "next/script";
import { useState } from "react";
import type { FormEvent } from "react";
import { artists } from "@/content/artists";
import type { BookingFieldErrors } from "@/lib/inquiries/schema";

type ApiResponse = {
  ok: boolean;
  confirmationId?: string;
  message?: string;
  fieldErrors?: BookingFieldErrors;
};

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

const testSiteKey = "1x00000000000000000000AA";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [confirmationId, setConfirmationId] = useState("");
  const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    (process.env.NODE_ENV === "development" ? testSiteKey : "");

  const errorFor = (field: keyof BookingFieldErrors) => fieldErrors[field]?.[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.message ?? "Please check the form and try again.");
        setFieldErrors(result.fieldErrors ?? {});
        window.turnstile?.reset();
        return;
      }

      setStatus("success");
      setConfirmationId(result.confirmationId ?? "");
      form.reset();
      window.turnstile?.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We could not send the inquiry. Please email booking@breakwaterbooking.com.",
      );
      window.turnstile?.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="form-success__index">Inquiry received</span>
        <h3>Thank you. We have the details.</h3>
        <p>
          We will review the opportunity and respond by email. Keep this
          confirmation number for reference.
        </p>
        <strong>{confirmationId}</strong>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setStatus("idle");
            setConfirmationId("");
          }}
        >
          Send another inquiry ↗
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="sourcePage" value="/" />

      <fieldset>
        <legend>
          <span>01</span> Your details
        </legend>
        <div className="form-grid">
          <Field label="Contact name" error={errorFor("contactName")}>
            <input
              id="contactName"
              name="contactName"
              autoComplete="name"
              aria-invalid={Boolean(errorFor("contactName"))}
              aria-describedby={errorFor("contactName") ? "contactName-error" : undefined}
              required
            />
          </Field>
          <Field
            label="Venue, promoter, or organization"
            error={errorFor("organization")}
          >
            <input
              id="organization"
              name="organization"
              autoComplete="organization"
              aria-invalid={Boolean(errorFor("organization"))}
              aria-describedby={errorFor("organization") ? "organization-error" : undefined}
              required
            />
          </Field>
          <Field label="Email" error={errorFor("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={errorFor("email") ? "email-error" : undefined}
              required
            />
          </Field>
          <Field label="Phone (optional)" error={errorFor("phone")}>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span>02</span> The opportunity
        </legend>
        <div className="form-grid">
          <Field label="Inquiry type" error={errorFor("inquiryType")}>
            <select id="inquiryType" name="inquiryType" defaultValue="live-booking">
              <option value="live-booking">Live booking</option>
              <option value="festival">Festival appearance</option>
              <option value="support">Support opportunity</option>
              <option value="private-event">Private event</option>
              <option value="general">General inquiry</option>
            </select>
          </Field>
          <Field label="Artist" error={errorFor("artistSlug")}>
            <select
              id="artistSlug"
              name="artistSlug"
              defaultValue=""
              aria-invalid={Boolean(errorFor("artistSlug"))}
              aria-describedby={errorFor("artistSlug") ? "artistSlug-error" : undefined}
              required
            >
              <option value="" disabled>
                Select an artist
              </option>
              {artists.map((artist) => (
                <option value={artist.slug} key={artist.slug}>
                  {artist.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Venue name" error={errorFor("venueName")}>
            <input
              id="venueName"
              name="venueName"
              aria-invalid={Boolean(errorFor("venueName"))}
              aria-describedby={errorFor("venueName") ? "venueName-error" : undefined}
              required
            />
          </Field>
          <Field label="City and state" error={errorFor("cityState")}>
            <input
              id="cityState"
              name="cityState"
              autoComplete="address-level2"
              placeholder="San Diego, CA"
              aria-invalid={Boolean(errorFor("cityState"))}
              aria-describedby={errorFor("cityState") ? "cityState-error" : undefined}
              required
            />
          </Field>
          <Field label="Requested date" error={errorFor("requestedDate")}>
            <input
              id="requestedDate"
              name="requestedDate"
              type="date"
              aria-invalid={Boolean(errorFor("requestedDate"))}
              aria-describedby={errorFor("requestedDate") ? "requestedDate-error" : undefined}
              required
            />
          </Field>
          <Field label="Alternate date (optional)" error={errorFor("alternateDate")}>
            <input id="alternateDate" name="alternateDate" type="date" />
          </Field>
          <Field label="Venue capacity (optional)" error={errorFor("capacity")}>
            <input id="capacity" name="capacity" type="number" min="1" inputMode="numeric" />
          </Field>
          <Field label="Proposed budget (optional)" error={errorFor("proposedBudget")}>
            <input
              id="proposedBudget"
              name="proposedBudget"
              placeholder="Guarantee, range, or door deal"
            />
          </Field>
          <Field label="Deal structure (optional)" error={errorFor("dealStructure")}>
            <select id="dealStructure" name="dealStructure" defaultValue="">
              <option value="">Select if known</option>
              <option value="guarantee">Guarantee</option>
              <option value="door-split">Door split</option>
              <option value="guarantee-plus-percentage">Guarantee + percentage</option>
              <option value="festival-offer">Festival offer</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span>03</span> Context
        </legend>
        <Field label="Opportunity details" error={errorFor("details")}>
          <textarea
            id="details"
            name="details"
            rows={6}
            placeholder="Set length, other artists, production notes, ticketing, timeline, or anything else we should know."
            aria-invalid={Boolean(errorFor("details"))}
            aria-describedby={errorFor("details") ? "details-error" : undefined}
            required
          />
        </Field>
      </fieldset>

      <div className="form-submit-row">
        <div>
          {turnstileSiteKey ? (
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-action="turnstile-spin-v2"
              data-theme="light"
              data-response-field-name="turnstileToken"
            />
          ) : (
            <p className="form-config-warning">
              Security verification must be configured before submissions can open.
            </p>
          )}
          {errorFor("turnstileToken") ? (
            <span className="field-error" id="turnstileToken-error">
              {errorFor("turnstileToken")}
            </span>
          ) : null}
        </div>
        <button
          className="submit-button"
          type="submit"
          disabled={status === "submitting" || !turnstileSiteKey}
        >
          {status === "submitting" ? "Sending…" : "Submit inquiry"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="form-status" aria-live="polite">
        {status === "error" ? message : ""}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const childId =
    children && typeof children === "object" && "props" in children
      ? (children.props as { id?: string }).id
      : undefined;

  return (
    <div className="form-field">
      {childId ? <label htmlFor={childId}>{label}</label> : <span className="field-label">{label}</span>}
      {children}
      {error && childId ? (
        <span className="field-error" id={`${childId}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
