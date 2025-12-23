import express from "express"; // eslint-disable-line
import { processLeads } from "../controllers/leadController.js"; // eslint-disable-line

// eslint-disable-next-line
const router = express.Router();

router.post("/process", processLeads);

export default router;
