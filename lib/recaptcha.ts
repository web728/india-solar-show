export type RecaptchaWidgetOptions = {
  sitekey: string;

  theme?: "light" | "dark";

  size?: "normal" | "compact";

  callback?: (
    token: string,
  ) => void;

  "expired-callback"?: () => void;

  "error-callback"?: () => void;
};

export type RecaptchaApi = {
  ready?: (
    callback: () => void,
  ) => void;

  render?: (
    container: HTMLElement,
    parameters: RecaptchaWidgetOptions,
  ) => number;

  reset?: (
    widgetId?: number,
  ) => void;

  getResponse?: (
    widgetId?: number,
  ) => string;
};

export function getRecaptcha():
  RecaptchaApi | undefined {
  if (
    typeof window === "undefined"
  ) {
    return undefined;
  }

  return (
    window as typeof window & {
      grecaptcha?: RecaptchaApi;
    }
  ).grecaptcha;
}