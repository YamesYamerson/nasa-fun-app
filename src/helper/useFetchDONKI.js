import { useEffect, useState } from 'react';

const useFetchDONKI = () => {
    const [data, setData] = useState({
        cmes: [],
        notifications: [],
        solarFlares: [],
    });
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchDONKI = async () => {
            const today = new Date();
            const startDateCME = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days before today
            const startDateNotifications = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days before today
            const startDateSolarFlares = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            try {
                // Fetching data for different endpoints
                const fetchCMEs = fetch(`/api/cmes?startDate=${startDateCME.toISOString()}&endDate=${today.toISOString()}`);
                const fetchNotifications = fetch(`/api/notifications?startDate=${startDateNotifications.toISOString()}&endDate=${today.toISOString()}`);
                const fetchSolarFlares = fetch(`/api/solar-flares?startDate=${startDateSolarFlares.toISOString()}&endDate=${today.toISOString()}`);

                const responses = await Promise.all([fetchCMEs, fetchNotifications, fetchSolarFlares]);

                // Check all responses are okay
                if (responses.some((response) => !response.ok)) {
                    throw new Error("One or more requests failed.");
                }

                const [cmesResponse, notificationsResponse, solarFlaresResponse] = responses;

                // Check for valid JSON response
                const isJSON = (response) => response.headers.get("Content-Type").includes("application/json");

                if (
                    !isJSON(cmesResponse) ||
                    !isJSON(notificationsResponse) ||
                    !isJSON(solarFlaresResponse)
                ) {
                    throw new Error("Unexpected response format.");
                }

                const cmesData = await cmesResponse.json(); // Parse only if valid
                const notificationsData = await notificationsResponse.json(); // Parse only if valid
                const solarFlaresData = await solarFlaresResponse.json(); // Parse only if valid

                setData({
                    cmes: cmesData.slice(0, 5),
                    notifications: notificationsData.slice(0, 5),
                    solarFlares: solarFlaresData.slice(0, 5),
                });
            } catch (error) {
                console.error("Error fetching DONKI data:", error);
                setError(error); // Set error state
            }
        };

        fetchDONKI(); // Call the function within useEffect
    }, []); // No dependencies ensure this runs only once on component mount

    return { data, error }; // Return data and error state
};

export default useFetchDONKI;
