import React from 'react';
import useFetchDONKI from '../../functions/useFetchDONKI';

const DonkiContent = () => {
    const { cmes, notifications, solarFlares } = useFetchDONKI();

    return (
        <div>
            <h2>Last 5 CMEs</h2>
            <ul>
                {cmes.slice(-5).map(cme => (
                    <li key={cme.activityID}>
                        <strong>Activity ID:</strong> {cme.activityID}<br />
                        <strong>Start Time:</strong> {cme.startTime}<br />
                        {/* Add more information as needed */}
                    </li>
                ))}
            </ul>
            <h2>Last 5 Notifications</h2>
            <ul>
                {notifications.slice(-5).map(notification => (
                    <li key={notification.messageID}>
                        <strong>Message Type:</strong> {notification.messageType}<br />
                        <strong>Message Issue Time:</strong> {notification.messageIssueTime}<br />
                        {/* Add more information as needed */}
                    </li>
                ))}
            </ul>
            <h2>Last 5 Solar Flares</h2>
            <ul>
                {solarFlares.slice(-5).map(solarFlare => (
                    <li key={solarFlare.flrID}>
                        <strong>Flare ID:</strong> {solarFlare.flrID}<br />
                        <strong>Begin Time:</strong> {solarFlare.beginTime}<br />
                        {/* Add more information as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonkiContent;
