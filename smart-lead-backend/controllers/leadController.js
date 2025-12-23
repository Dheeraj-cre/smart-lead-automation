import Lead from "../models/Lead.js"; // Import Lead model
import { getNationality } from "../services/nationalizeService.js";  // Import nationality service


// Controller to process leads
export const processLeads = async (req, res) => {

// Extract names from request body and process each
  try {
    const { names } = req.body;

    const results = await Promise.all(
      names.map(async (name) => {
        const data = await getNationality(name);

        let country = "Unknown";
        let probability = 0;

        if (data.country?.length > 0) {
          country = data.country[0].country_id;
          probability = data.country[0].probability;
        }

        const status =
          probability > 0.6 ? "Verified" : "To Check";

        const lead = await Lead.create({
          name,
          country,
          probability,
          status
        });

        return lead;
      })
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
