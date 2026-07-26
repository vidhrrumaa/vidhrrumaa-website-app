/**
 * Turnstile.tsx
 * ─────────────
 * Cloudflare Turnstile widget (bot check for the Contact and Careers forms).
 * Uses explicit rendering rather than the auto-scan/implicit mode: both forms
 * on this page can mount, submit, and remount (e.g. "Send Another") within a
 * single page load, and implicit mode only scans the DOM once on script load.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { loadTurnstile } from "@/lib/turnstile";

export type TurnstileHandle = { reset: () => void };

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
};

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  ({ onVerify, onExpire, theme = "auto" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    // Kept fresh via refs so the mount effect below never needs to re-run
    // (and re-render the widget) just because a parent passed new closures.
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
      },
    }));

    useEffect(() => {
      if (!SITE_KEY) return;
      let cancelled = false;

      loadTurnstile().then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme,
          size: "flexible",
          appearance: "interaction-only",
          callback: (token) => onVerifyRef.current(token),
          "expired-callback": () => onExpireRef.current?.(),
        });
      });

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!SITE_KEY) {
      if (import.meta.env.DEV) {
        return <p style={{ fontSize: "0.75rem", color: "#dc2626", margin: 0 }}>VITE_TURNSTILE_SITE_KEY is not set — verification widget hidden.</p>;
      }
      return null;
    }

    return <div ref={containerRef} />;
  },
);
