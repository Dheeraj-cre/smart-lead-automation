import express from "express";  // Importing Express framework
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction
import cors from "cors"; // Importing CORS middleware
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import leadRoutes from "./routes/leadRoutes.js"; // Importing lead routes
import "./jobs/crmSyncJob.js"; // Importing CRM sync job to run in the background

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/leads", leadRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
