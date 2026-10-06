"use client";

export type RecaptchaWidgetOptions = {
  sitekey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

export type RecaptchaApi = {
  ready?: (callback: () => void) => void;
  render?: (container: HTMLElement, parameters: RecaptchaWidgetOptions) => number;
  reset?: (widgetId?: number) => void;
  getResponse?: (widgetId?: number) => string;
};

const SCRIPT_ID = "google-recaptcha-v2";
const SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";

let recaptchaPromise: Promise<RecaptchaApi> | null = null;

export function getRecaptcha(): RecaptchaApi | undefined {
  if (typeof window === "undefined") return undefined;

  return (
    window as typeof window & {
      grecaptcha?: RecaptchaApi;
    }
  ).grecaptcha;
}

export function loadRecaptcha(): Promise<RecaptchaApi> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("reCAPTCHA is only available in the browser."),
    );
  }

  const existing = getRecaptcha();

  if (existing?.render) return Promise.resolve(existing);
  if (recaptchaPromise) return recaptchaPromise;

  recaptchaPromise = new Promise<RecaptchaApi>((resolve, reject) => {
    const waitForApi = () => {
      const api = getRecaptcha();

      if (api?.render) {
        resolve(api);
        return;
      }

      window.setTimeout(waitForApi, 100);
    };

    const existingScript = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      waitForApi();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;

    script.onload = waitForApi;

    script.onerror = () => {
      recaptchaPromise = null;
      reject(new Error("Failed to load Google reCAPTCHA."));
    };

    document.head.appendChild(script);
  });

  return recaptchaPromise;
}
