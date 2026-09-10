import mongoose from "mongoose";

const ConferenceSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  designation: String,
  country: String,
  sessionInterest: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Conference || mongoose.model("Conference", ConferenceSchema);
