import './crime-map.styles.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useCrimesContext } from '../../contexts/crime-data-context';


const CrimeMap = () => {
  const { crimes } = useCrimesContext();

  if (!crimes) {
    return <div className='load-map'>Loading map...</div>;
  }

  const blueMarkerIcon = new L.Icon({
    iconUrl: 'https://toppng.com/uploads/preview/location-vector-symbol-google-maps-marker-blue-115632628665jan8tcjlz.png',
    iconSize: [10, 10]
  });


  return (
    <div className="map">
      <h3>Map of Nigeria showing the Crime Distribution Data</h3>
      <MapContainer
        center={[9.0820, 8.6753]}
        zoom={6}              
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {crimes.data.map((crime, index) => (
          <Marker
            key={index}
            position={[parseFloat(crime.geoCode.lat), parseFloat(crime.geoCode.lng)]}
            icon={blueMarkerIcon}
          >
            <Popup>
              <div>
                <h3>Crime Type: {crime.crime}</h3>
                <p><b>Date:</b> {new Date(crime.date).toLocaleDateString()}</p>
                <p><b>Location:</b> {crime.geoCode.formattedAddress}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;