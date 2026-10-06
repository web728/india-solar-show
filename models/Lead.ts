import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface LeadDocument {
  fullName: string;

  company?: string;

  email: string;

  phone: string;

  designation?: string;

  country?: string;

  interestType: string;

  message?: string;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const LeadSchema =
  new Schema<LeadDocument>(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      company: {
        type: String,
        trim: true,
        default: "",
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

      interestType: {
        type: String,
        required: true,
        trim: true,
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

const Lead: Model<LeadDocument> =
  mongoose.models.Lead ||
  mongoose.model<LeadDocument>(
    "Lead",
    LeadSchema,
  );

export default Lead;