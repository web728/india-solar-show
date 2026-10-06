import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface ExhibitorDocument {
  fullName: string;

  designation: string;

  company: string;

  website?: string;

  addressLine1: string;

  city?: string;

  state?: string;

  postalCode?: string;

  country: string;

  phone: string;

  email: string;

  boothSize: string;

  productsServices: string;

  sponsorshipInterest: string;

  termsAgreed: boolean;

  declaration: boolean;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const ExhibitorSchema =
  new Schema<ExhibitorDocument>(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      designation: {
        type: String,
        required: true,
        trim: true,
      },

      company: {
        type: String,
        required: true,
        trim: true,
      },

      website: {
        type: String,
        trim: true,
        default: "",
      },

      addressLine1: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
        default: "",
      },

      state: {
        type: String,
        trim: true,
        default: "",
      },

      postalCode: {
        type: String,
        trim: true,
        default: "",
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
      },

      boothSize: {
        type: String,
        required: true,
        trim: true,
      },

      productsServices: {
        type: String,
        required: true,
        trim: true,
      },

      sponsorshipInterest: {
        type: String,
        required: true,
        trim: true,
      },

      termsAgreed: {
        type: Boolean,
        required: true,
        default: false,
      },

      declaration: {
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

const Exhibitor: Model<ExhibitorDocument> =
  mongoose.models.Exhibitor ||
  mongoose.model<ExhibitorDocument>(
    "Exhibitor",
    ExhibitorSchema,
  );

export default Exhibitor;