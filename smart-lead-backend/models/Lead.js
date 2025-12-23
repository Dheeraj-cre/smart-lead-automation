import mongoose from "mongoose"; // Import mongoose to define the schema

//  Define the Lead schema
const leadSchema = new mongoose.Schema({
  name: String,
  country: String,
  probability: Number,
  status: String, // Verified | To Check
  isSynced: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Lead", leadSchema);
