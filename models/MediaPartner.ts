import mongoose, {
  Schema,
  type Model,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export interface MediaPartnerDocument {
  fullName: string;

  email: string;

  phone: string;

  organization: string;

  designation?: string;

  country?: string;

  mediaType?: string;

  website?: string;

  message?: string;

  createdAt: Date;

  updatedAt: Date;
}

/* =========================================================
   SCHEMA
========================================================= */

const MediaPartnerSchema =
  new Schema<MediaPartnerDocument>(
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

      organization: {
        type: String,
        required: true,
        trim: true,
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

      mediaType: {
        type: String,
        trim: true,
        default: "",
      },

      website: {
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

const MediaPartner: Model<MediaPartnerDocument> =
  mongoose.models.MediaPartner ||
  mongoose.model<MediaPartnerDocument>(
    "MediaPartner",
    MediaPartnerSchema,
  );

export default MediaPartner;