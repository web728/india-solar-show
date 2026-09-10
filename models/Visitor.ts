import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  designation: String,
  country: String,
  industry: String,
  visitPurpose: String,
  termsAgreed: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);