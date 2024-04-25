import { useEffect, useState } from 'react';

// Define the DONKI API key (use a valid key for actual requests)
const API_KEY = 'k5NkO2ahsJNV6D84ph5bDu04U5YPYE30WC5hfgnW';

const useFetchDONKI = () => {
    const [data, setData] = useState({
        cmes: [],
        notifications: [],
        solarFlares: [],
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDONKI = async () => {
            const today = new Date();
            const startDateCME = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            const startDateNotifications = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            const startDateSolarFlares = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            try {
                // Use the appropriate API endpoints and parameters for each component service
                const fetchCMEs = fetch(
                    `https://api.nasa.gov/DONKI/CME?startDate=${startDateCME.toISOString().split("T")[0]}&endDate=${today.toISOString().split("T")[0]}&api_key=${API_KEY}`
                );

                const fetchNotifications = fetch(
                    `https://api.nasa.gov/DONKI/notifications?startDate=${startDateNotifications.toISOString().split("T")[0]}&endDate=${today.toISOString().split("T")[0]}&type=all&api_key=${API_KEY}`
                );

                const fetchSolarFlares = fetch(
                    `https://api.nasa.gov/DONKI/FLR?startDate=${startDateSolarFlares.toISOString().split("T")[0]}&endDate=${today.toISOString().split("T")[0]}&api_key=${API_KEY}`
                );

                const responses = await Promise.all([fetchCMEs, fetchNotifications, fetchSolarFlares]);

                const allResponsesOK = responses.every((response) => response.ok);

                if (!allResponsesOK) {
                    throw new Error("One or more requests failed.");
                }

                // Check that all responses are JSON
                const validateContentType = (response) => {
                    const contentType = response.headers.get("Content-Type");
                    return contentType && contentType.includes("application/json");
                };

                if (!responses.every(validateContentType)) {
                    throw new Error("Invalid content type received.");
                }

                const [cmesResponse, notificationsResponse, solarFlaresResponse] = responses;

                const cmesData = await cmesResponse.json();
                const notificationsData = await notificationsResponse.json();
                const solarFlaresData = await solarFlaresResponse.json();

                setData({
                    cmes: cmesData.slice(0, 5),
                    notifications: notificationsData.slice(0, 5),
                    solarFlares: solarFlaresData.slice(0, 5),
                });
            } catch (error) {
                setError(error);
            }
        };

        fetchDONKI();
    }, []);

    return { data, error };
};

export default useFetchDONKI;
