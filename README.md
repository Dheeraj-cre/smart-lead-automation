Smart Lead Automation System

A full-stack Smart Lead Enrichment Automation built as part of the VR Automations Developer Test.

PROJECT OVERVIEW
This project simulates a real-world lead enrichment workflow where user-submitted names are enriched using a third-party API, processed using business rules, stored in a database, and synced through a background automation job.

TECH STACK
Frontend: React (Vite), HTML, CSS, JavaScript
Backend: Node.js, Express.js, MongoDB (Mongoose)
Other Tools: Axios, node-cron
Deployment: Frontend on Vercel/Netlify, Backend on Render, Database on MongoDB Atlas

FEATURES
- Batch input of names
- External API enrichment using Nationalize.io
- Business logic classification (Verified / To Check)
- MongoDB persistence
- Background job for CRM sync simulation
- Idempotent processing

BUSINESS LOGIC
If probability >= 60% → Verified
If probability < 60% → To Check
API failures fallback to safe defaults

BACKGROUND AUTOMATION
A cron job runs every 5 minutes to sync verified leads.
Each lead is synced only once using a database flag to ensure idempotency.

LOCAL VS PRODUCTION NOTE
Localhost works without restriction as requests originate from a personal IP.
Production uses a shared cloud IP which is rate-limited by the third-party API.
The application handles this gracefully using fallback logic.

SETUP INSTRUCTIONS
Backend:
npm install
npm run dev

Frontend:
npm install
npm run dev

ENVIRONMENT VARIABLES
PORT=5000
MONGO_URI=mongodb+srv://Dheeraj-2304:VbxyFhKM3RTq61RS@cluster0.v7w0wuk.mongodb.net/
VITE_API_URL=https://smart-lead-automation-dkcd.onrender.com/

CONCLUSION
This project demonstrates real-world backend automation patterns including API integration, async processing, background jobs, and data integrity handling.

