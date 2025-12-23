# Smart Lead Automation System

## Overview
This project is a full-stack application built as part of the **VR Automations Developer Test**.  
It simulates a real-world **lead enrichment automation system** where user-submitted names are enriched using a third-party API, processed with business rules, stored in a database, and automatically synced using a background task.

---

## Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **External API:** Nationalize.io
- **Automation:** node-cron

---

## Features
- Batch input of first names
- Live results table with country, probability, and status
- Filter leads by status (Verified / To Check)
- Automated background sync for verified leads
- Duplicate sync prevention (idempotency)

---

## Setup Instructions

### Frontend Setup
```bash
npm install
npm start
