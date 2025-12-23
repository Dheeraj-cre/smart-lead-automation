// smart-lead-app/smart-lead-backend/services/nationalizeService.js
// Service to get nationality based on name
// export const getNationality = async (name) => {
//   const response = await fetch(
//     `https://api.nationalize.io?name=${name}`
//   );
//   return response.json();
// };

import fetch from "node-fetch";

export const getNationality = async (name) => {
  try {
    const response = await fetch(
      `https://api.nationalize.io?name=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
        timeout: 5000
      }
    );

    if (!response.ok) {
      console.error("Nationalize API failed:", response.status);
      return { country: [] };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Nationalize API error:", error.message);
    return { country: [] };
  }
};
