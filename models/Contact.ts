import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface ContactDocument {
  fullName: string;

  email: string;

  phone: string;

  company?: string;

  subject: string;

  message?: string;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const ContactSchema =
  new Schema<ContactDocument>(
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

      subject: {
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

const Contact: Model<ContactDocument> =
  mongoose.models.Contact ||
  mongoose.model<ContactDocument>(
    "Contact",
    ContactSchema,
  );

export default Contact;