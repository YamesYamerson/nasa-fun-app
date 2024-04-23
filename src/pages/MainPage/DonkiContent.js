import React from 'react';
import useFetchDONKI from '../../helper/useFetchDONKI';

const DonkiContent = () => {
    const { data, error } = useFetchDONKI(); // Include error state
    const { cmes, notifications, solarFlares } = data;

    return (
        <div>
            {error ? (
                <div>
                    <h2>Error loading DONKI data</h2>
                    <p>{error.message}</p> {/* Display error message */}
                </div>
            ) : (
                <div>
                    <h2>Last 5 CMEs</h2>
                    {cmes.length > 0 ? (
                        <ul>
                            {cmes.map((cme) => (
                                <li key={cme.activityID}>
                                    <strong>Activity ID:</strong> {cme.activityID}<br />
                                    <strong>Start Time:</strong> {cme.startTime}<br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No CME data available.</p>
                    )}

                    <h2>Last 5 Notifications</h2>
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.messageID}>
                                    <strong>Message Type:</strong> {notification.messageType}<br />
                                    <strong>Message Issue Time:</strong> {notification.messageIssueTime}<br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No notifications available.</p>
                    )}

                    <h2>Last 5 Solar Flares</h2>
                    {solarFlares.length > 0 ? (
                        <ul>
                            {solarFlares.map((solarFlare) => (
                                <li key={solarFlare.flrID}>
                                    <strong>Flare ID:</strong> {solarFlare.flrID}<br />
                                    <strong>Begin Time:</strong> {solarFlare.beginTime}<br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No solar flares available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DonkiContent;
