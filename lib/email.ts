import nodemailer from "nodemailer";

/* =========================================================
   ENV
========================================================= */

const EMAIL_USER =
  process.env.EMAIL_USER;

const EMAIL_PASS =
  process.env.EMAIL_PASS;

/* =========================================================
   VALIDATION
========================================================= */

if (!EMAIL_USER) {
  throw new Error(
    "EMAIL_USER environment variable is not configured.",
  );
}

if (!EMAIL_PASS) {
  throw new Error(
    "EMAIL_PASS environment variable is not configured.",
  );
}

/* =========================================================
   ADMIN RECIPIENTS
========================================================= */

const ENV_ADMIN_EMAILS =
  (
    process.env.ADMIN_EMAILS ??
    ""
  )
    .split(",")
    .map((email) =>
      email.trim(),
    )
    .filter(Boolean);

export const DEFAULT_ADMIN_EMAILS =
  ENV_ADMIN_EMAILS.length > 0
    ? ENV_ADMIN_EMAILS
    : [
        "info@futurextrade.com",
        "admin@futurextrade.com",
      ];

/* =========================================================
   TRANSPORTER
========================================================= */

export const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        EMAIL_USER,

      pass:
        EMAIL_PASS,
    },
  });

/* =========================================================
   VERIFY
========================================================= */

export async function verifyEmailTransporter():
  Promise<boolean> {
  try {
    await transporter.verify();

    console.log(
      "[Email] Gmail transporter is ready.",
    );

    return true;
  } catch (error) {
    console.error(
      "[Email] Gmail transporter verification failed:",
      error,
    );

    return false;
  }
}