import Lead from "../models/Lead.js"; 
import { getNationality } from "../services/nationalizeService.js";

// Controller to process leads
export const processLeads = async (req, res) => {
  try {
    const { names } = req.body;

    // Basic validation
    if (!Array.isArray(names) || names.length === 0) {
      return res.status(400).json({ message: "Names array is required" });
    }

    const results = await Promise.all(
      names.map(async (name) => {

        // Call Nationalize API
        const data = await getNationality(name);

        let country = "Unknown";
        let probability = 0;

        // Safely extract country & probability
        if (data && Array.isArray(data.country) && data.country.length > 0) {
          country = data.country[0].country_id;
          probability = data.country[0].probability;
        }

        // Business logic
        const status = probability > 0.6 ? "Verified" : "To Check";

        // Save lead in database
        const lead = await Lead.create({
          name,
          country,
          probability,
          status
        });

        return lead;
      })
    );

    // Send response to frontend
    res.status(200).json(results);

  } catch (error) {
    console.error("Error processing leads:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
