import { useEffect, useState } from 'react';

const useFetchDONKI = () => {
    const [data, setData] = useState({
        cmes: [],
        notifications: [],
        solarFlares: [],
    });
    const [error, setError] = useState(null); // New error state

    useEffect(() => {
        const fetchDONKI = async () => {
            const today = new Date();
            const startDateCME = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            const startDateNotifications = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            const startDateSolarFlares = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

            try {
                const fetchCMEs = fetch(`/api/cmes?startDate=${startDateCME.toISOString()}&endDate=${today.toISOString()}`);
                const fetchNotifications = fetch(`/api/notifications?startDate=${startDateNotifications.toISOString()}&endDate=${today.toISOString()}`);
                const fetchSolarFlares = fetch(`/api/solar-flares?startDate=${startDateSolarFlares.toISOString()}&endDate=${today.toISOString()}`);

                const [cmesResponse, notificationsResponse, solarFlaresResponse] = await Promise.all([fetchCMEs, fetchNotifications, fetchSolarFlares]);

                if (!cmesResponse.ok || !notificationsResponse.ok || !solarFlaresResponse.ok) {
                    throw new Error("Error fetching data from the server");
                }

                const cmesData = await cmesResponse.json();
                const notificationsData = await notificationsResponse.json();
                const solarFlaresData = await solarFlaresResponse.json();

                setData({
                    cmes: cmesData.slice(0, 5),
                    notifications: notificationsData.slice(0, 5),
                    solarFlares: solarFlaresData.slice(0, 5),
                });
            } catch (error) {
                console.error("Error fetching DONKI data:", error);
                setError(error); // Update the error state
            }
        };

        fetchDONKI();
    }, []);

    return { data, error }; // Return error state
};

export default useFetchDONKI;
