import React from 'react';
import useFetchDONKI from '../../helper/useFetchDONKI';

const DonkiContent = () => {
    const { data, error } = useFetchDONKI(); // Include error state
    const { cmes, notifications, solarFlares } = data; // Destructure fetched data

    return (
        <div>
            {/* Display error message if fetching fails */}
            {error ? (
                <div>
                    <h2>Error loading DONKI data</h2>
                    <p>{error.message}</p>
                </div>
            ) : (
                <div>
                    {/* Coronal Mass Ejections (CMEs) Section */}
                    <h2>Coronal Mass Ejections (CMEs)</h2>
                    {cmes.length > 0 ? (
                        <ul>
                            {cmes.map((cme) => (
                                <li key={cme.activityID}>
                                    <strong>Activity ID:</strong> {cme.activityID}<br />
                                    <strong>Start Time:</strong> {cme.startTime}<br />
                                    <strong>Source Location:</strong> {cme.sourceLocation ?? 'Unknown'}<br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No CME data available.</p>
                    )}

                    {/* Notifications Section */}
                    <h2>Recent Notifications</h2>
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.map((notification) => (
                                <li key={notification.messageID}>
                                    <strong>Message Type:</strong> {notification.messageType}<br />
                                    <strong>Message Issue Time:</strong> {notification.messageIssueTime}<br />
                                    <strong>Message URL:</strong> <a href={notification.messageURL} target="_blank" rel="noopener noreferrer">View</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No notifications available.</p>
                    )}

                    {/* Solar Flares Section */}
                    <h2>Solar Flares</h2>
                    {solarFlares.length > 0 ? (
                        <ul>
                            {solarFlares.map((solarFlare) => (
                                <li key={solarFlare.flrID}>
                                    <strong>Flare ID:</strong> {solarFlare.flrID}<br />
                                    <strong>Begin Time:</strong> {solarFlare.beginTime}<br />
                                    <strong>Peak Time:</strong> {solarFlare.peakTime ?? 'Unknown'}<br />
                                    <strong>Class Type:</strong> {solarFlare.classType ?? 'Unknown'}<br />
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
