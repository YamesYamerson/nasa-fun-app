import { useEffect, useState } from 'react';

const useFetchDONKI = () => {
    const [data, setData] = useState({
        cmes: [],
        notifications: [],
        solarFlares: []
    });

    useEffect(() => {
        const fetchDONKI = async () => {
            const today = new Date();
            const startDateCME = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
            const startDateNotifications = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
            const startDateSolarFlares = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

            try {
                const fetchCMEs = fetch(`/api/get-cmes?startDate=${startDateCME.toISOString()}&endDate=${today.toISOString()}`)
                    .then(response => response.json());

                const fetchNotifications = fetch(`/api/get-notifications?startDate=${startDateNotifications.toISOString()}&endDate=${today.toISOString()}`)
                    .then(response => response.json());

                const fetchSolarFlares = fetch(`/api/get-solar-flare?startDate=${startDateSolarFlares.toISOString()}&endDate=${today.toISOString()}`)
                    .then(response => response.json());

                const [cmesData, notificationsData, solarFlaresData] = await Promise.all([fetchCMEs, fetchNotifications, fetchSolarFlares]);

                console.log("CMEs Data:", cmesData);
                console.log("Notifications Data:", notificationsData);
                console.log("Solar Flares Data:", solarFlaresData);

                setData({
                    cmes: cmesData.slice(-5),
                    notifications: notificationsData.slice(-5),
                    solarFlares: solarFlaresData.slice(-5)
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDONKI();
    }, []);

    return data;
};

export default useFetchDONKI;
