// smart-lead-app/smart-lead-backend/services/nationalizeService.js
// Service to get nationality based on name
export const getNationality = async (name) => {
  const response = await fetch(
    `https://api.nationalize.io?name=${name}`
  );
  return response.json();
};
