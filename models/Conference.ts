import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface ConferenceDocument {
  fullName: string;

  email: string;

  phone: string;

  company?: string;

  designation?: string;

  country?: string;

  sessionInterest?: string;

  message?: string;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const ConferenceSchema =
  new Schema<ConferenceDocument>(
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

      sessionInterest: {
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

const Conference: Model<ConferenceDocument> =
  mongoose.models.Conference ||
  mongoose.model<ConferenceDocument>(
    "Conference",
    ConferenceSchema,
  );

export default Conference;