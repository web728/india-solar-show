import mongoose from "mongoose";

const MediaPartnerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  organization: String,
  designation: String,
  country: String,
  mediaType: String,
  website: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MediaPartner || mongoose.model("MediaPartner", MediaPartnerSchema);
