type RecaptchaVerifyResponse = {
  success: boolean;

  challenge_ts?: string;

  hostname?: string;

  "error-codes"?: string[];
};

export async function verifyRecaptcha(
  token: string,
): Promise<boolean> {
  const secret =
    process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error(
      "[reCAPTCHA] RECAPTCHA_SECRET_KEY is not configured.",
    );

    return false;
  }

  const cleanToken =
    token?.trim();

  if (!cleanToken) {
    console.warn(
      "[reCAPTCHA] Missing token.",
    );

    return false;
  }

  try {
    const body =
      new URLSearchParams({
        secret,
        response:
          cleanToken,
      });

    const response =
      await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            body.toString(),

          cache:
            "no-store",
        },
      );

    if (!response.ok) {
      console.error(
        `[reCAPTCHA] Google verification request failed with status ${response.status}.`,
      );

      return false;
    }

    const result =
      (await response.json()) as RecaptchaVerifyResponse;

    if (!result.success) {
      console.warn(
        "[reCAPTCHA] Verification rejected:",
        result[
          "error-codes"
        ] ?? [],
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "[reCAPTCHA] Verification failed:",
      error,
    );

    return false;
  }
}