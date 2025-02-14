const axios = require('axios');
const apiUrl = "/api/links"; // API hosted on Next.js

export async function getAdminLinks() {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch admin links", error);
        return [];
    }
}
