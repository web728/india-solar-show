import mongoose from "mongoose";

const ExhibitorSchema = new mongoose.Schema({
  fullName: String,
  designation: String,
  company: String,
  addressLine1: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  phone: String,
  email: String,
  boothSize: String,
  productsServices: String,
  sponsorshipInterest: String,
  termsAgreed: Boolean,
  declaration: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Exhibitor || mongoose.model("Exhibitor", ExhibitorSchema);