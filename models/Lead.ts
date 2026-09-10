import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  fullName: String,
  company: String,
  email: String,
  phone: String,
  designation: String,
  country: String,
  interestType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);