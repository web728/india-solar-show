import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface VisitorDocument {
  fullName: string;

  email: string;

  phone: string;

  company?: string;

  designation?: string;

  country: string;

  industry: string;

  visitPurpose: string;

  termsAgreed: boolean;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const VisitorSchema =
  new Schema<VisitorDocument>(
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
        required: true,
        trim: true,
      },

      industry: {
        type: String,
        required: true,
        trim: true,
      },

      visitPurpose: {
        type: String,
        required: true,
        trim: true,
      },

      termsAgreed: {
        type: Boolean,
        required: true,
        default: false,
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

const Visitor: Model<VisitorDocument> =
  mongoose.models.Visitor ||
  mongoose.model<VisitorDocument>(
    "Visitor",
    VisitorSchema,
  );

export default Visitor;