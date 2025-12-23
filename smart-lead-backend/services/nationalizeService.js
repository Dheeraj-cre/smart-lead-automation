// smart-lead-app/smart-lead-backend/services/nationalizeService.js
// Service to get nationality based on name
// export const getNationality = async (name) => {
//   const response = await fetch(
//     `https://api.nationalize.io?name=${name}`
//   );
//   return response.json();
// };

// services/nationalizeService.js
// import axios from "axios";

// export const getNationality = async (name) => {
//   try {
//     const response = await axios.get(
//       "https://api.nationalize.io",
//       {
//         params: { name },
//         timeout: 5000
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Nationalize API error:", error.message);
//     return { country: [] };
//   }
// };

import axios from "axios";

export const getNationality = async (name) => {
  try {
    const response = await axios.get(
      "https://api.nationalize.io",
      {
        params: { name },
        timeout: 5000
      }
    );

    const data = response.data;

    if (data.country && data.country.length > 0) {
      return {
        country: [
          {
            country_id: data.country[0].country_id,
            probability: data.country[0].probability
          }
        ]
      };
    }

    return { country: [] };

  } catch (error) {
    console.error(`Error enriching name ${name}:`, error.message);
    return { country: [] };
  }
};
