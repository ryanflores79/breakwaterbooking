"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

type Consent = "accepted" | "declined" | "loading" | null;

const STORAGE_KEY = "breakwater-analytics-consent";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("breakwater:privacy-settings", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("breakwater:privacy-settings", callback);
  };
}

function getConsentSnapshot(): Consent {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

function getServerConsentSnapshot(): Consent {
  return "loading";
}

export function PrivacySettingsButton() {
  return (
    <button
      className="footer-link-button"
      type="button"
      onClick={() => {
        window.localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event("breakwater:privacy-settings"));
      }}
    >
      Privacy choices
    </button>
  );
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  const choose = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("breakwater:privacy-settings"));
  };

  return (
    <>
      {consent === "accepted" && measurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="breakwater-ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <aside className="consent-banner" aria-label="Analytics preferences">
          <div>
            <p className="consent-banner__title">A small, useful signal</p>
            <p>
              We use optional analytics to understand which pages help talent
              buyers. Booking forms work either way.
            </p>
          </div>
          <div className="consent-banner__actions">
            <button type="button" onClick={() => choose("declined")}>
              Decline
            </button>
            <button
              className="consent-banner__accept"
              type="button"
              onClick={() => choose("accepted")}
            >
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
