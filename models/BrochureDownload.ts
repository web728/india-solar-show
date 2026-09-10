import mongoose from "mongoose";

const BrochureDownloadSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  designation: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BrochureDownload || mongoose.model("BrochureDownload", BrochureDownloadSchema);
