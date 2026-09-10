import mongoose from "mongoose";

const SponsorshipSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  designation: String,
  country: String,
  sponsorshipTier: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Sponsorship || mongoose.model("Sponsorship", SponsorshipSchema);
