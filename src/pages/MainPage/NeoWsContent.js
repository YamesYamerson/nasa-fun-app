import useFetchNeoWs from '../../helper/useFetchNeoWs';
import './NeoWsContent.css';
import HappyPlanetLoading from '../../components/HappyPlanetLoading';

const NeoWsContent = () => {
  // Get today's date
  const currentDate = new Date();

  // Calculate the past three days' start and end dates
  const finalEndDate = currentDate.toISOString().split('T')[0]; // Today's date
  const finalStartDate = new Date(currentDate); // Create a new date instance for manipulation
  finalStartDate.setDate(finalStartDate.getDate() - 2); // Go back three days (includes today)

  const start = finalStartDate.toISOString().split('T')[0]; // Convert to ISO string

  const { data, error, loading } = useFetchNeoWs(start, finalEndDate);

  if (loading) {
    return <HappyPlanetLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.near_earth_objects) {
    return <div>No data available for this date range.</div>;
  }

  return (
    <div className="neows-content">
      <h1 className="neows-title">
        Near-Earth Objects from {start} to {finalEndDate}
      </h1>
      {Object.keys(data.near_earth_objects).map((date) => (
        <div key={date} className="neows-date">
          <h2>Date: {date}</h2>
          {Array.isArray(data.near_earth_objects[date])
            ? data.near_earth_objects[date].map((neo) => (
                <div key={neo.id} className="neows-object">
                  <p>Name: {neo.name}</p>
                  <p>Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                  {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour && (
                    <p>
                      Relative Velocity (km/h):{' '}
                      {parseFloat(
                        neo.close_approach_data[0].relative_velocity.kilometers_per_hour
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              ))
            : <div>No near-Earth objects found for this date.</div>}
        </div>
      ))}
    </div>
  );
};

export default NeoWsContent;
