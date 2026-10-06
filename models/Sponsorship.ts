import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface SponsorshipDocument {
  fullName: string;

  email: string;

  phone: string;

  company?: string;

  designation?: string;

  country?: string;

  sponsorshipTier?: string;

  message?: string;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const SponsorshipSchema =
  new Schema<SponsorshipDocument>(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      company: {
        type: String,
        trim: true,
        default: "",
      },

      designation: {
        type: String,
        trim: true,
        default: "",
      },

      country: {
        type: String,
        trim: true,
        default: "",
      },

      sponsorshipTier: {
        type: String,
        trim: true,
        default: "",
      },

      message: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      timestamps: true,

      versionKey: false,
    },
  );

/* =========================================================
   MODEL
========================================================= */

const Sponsorship: Model<SponsorshipDocument> =
  mongoose.models.Sponsorship ||
  mongoose.model<SponsorshipDocument>(
    "Sponsorship",
    SponsorshipSchema,
  );

export default Sponsorship;