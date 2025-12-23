import cron from "node-cron"; // Schedule tasks
import Lead from "../models/Lead.js"; // Lead model

// Schedule a job to run every 5 minutes

cron.schedule("*/5 * * * *", async () => {
  const leads = await Lead.find({
    status: "Verified",
    isSynced: false
  });

  // Simulate sending leads to CRM or Sales Team
  for (const lead of leads) {
    console.log(
      `[CRM Sync] Sending verified lead ${lead.name} to Sales Team...`
    );

    lead.isSynced = true;
    await lead.save();
  }
});
