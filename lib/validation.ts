import { z } from "zod";
import { INTEREST_TYPES } from "@/data/siteData";

const nameField = z.string().trim().min(2, "Please enter your full name.");
const emailField = z.string().trim().min(1, "Email is required.").email("Enter a valid email address.");
const phoneField = z.string().trim().min(7, "Enter a valid phone number.").regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number.");
const optionalString = z.string().trim().optional().or(z.literal(""));

// Original lead schema (preserved for backward compatibility)
export const leadSchema = z.object({
  fullName: nameField,
  company: optionalString,
  email: emailField,
  phone: phoneField,
  designation: optionalString,
  country: optionalString,
  interestType: z.enum(INTEREST_TYPES, { message: "Please select an interest type." }),
  message: optionalString,
});

export type LeadFormValues = z.infer<typeof leadSchema>;
export type Lead = LeadFormValues & { id: string; createdAt: string };

// Visitor Registration
export const visitorSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  company: z.string().trim().min(2, "Company name is required."),
  designation: optionalString,
  country: z.string().trim().min(1, "Please select a country."),
  industry: z.string().trim().min(1, "Please select your industry."),
  visitPurpose: z.string().trim().min(1, "Please select your purpose of visit."),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});
export type VisitorFormValues = z.infer<typeof visitorSchema>;


// Exhibitor Registration
export const exhibitorSchema = z.object({
  fullName: nameField,
  designation: z.string().trim().min(2, "Designation is required."),
  company: z.string().trim().min(2, "Company name is required."),
  addressLine1: z.string().trim().min(2, "Address is required."),
  city: optionalString,
  state: optionalString,
  postalCode: optionalString,
  country: z.string().trim().min(1, "Please select a country."),
  phone: phoneField,
  email: emailField,
  boothSize: z.string().trim().min(1, "Please select a booth size."),
  productsServices: z.string().trim().min(2, "Please describe your products/services."),
  sponsorshipInterest: z.string().trim().min(1, "Please select an option."),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the exhibitor terms and conditions.",
  }),
  declaration: z.boolean().refine((val) => val === true, {
    message: "Please confirm the declaration.",
  }),
});
export type ExhibitorFormValues = z.infer<typeof exhibitorSchema>;
// Contact Form
export const contactSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  company: optionalString,
  subject: z.string().trim().min(2, "Please enter a subject."),
  message: z.string().trim().min(5, "Please enter your message."),
});
export type ContactFormValues = z.infer<typeof contactSchema>;

// Sponsorship Enquiry
export const sponsorshipSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  company: z.string().trim().min(2, "Company name is required."),
  designation: optionalString,
  country: optionalString,
  sponsorshipTier: optionalString,
  message: optionalString,
});
export type SponsorshipFormValues = z.infer<typeof sponsorshipSchema>;

// Media Partner Form
export const mediaPartnerSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  organization: z.string().trim().min(2, "Organization name is required."),
  designation: optionalString,
  country: optionalString,
  mediaType: optionalString,
  website: optionalString,
  message: optionalString,
});
export type MediaPartnerFormValues = z.infer<typeof mediaPartnerSchema>;

// Brochure Download
export const brochureSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  company: optionalString,
  designation: optionalString,
  country: optionalString,
});
export type BrochureFormValues = z.infer<typeof brochureSchema>;
