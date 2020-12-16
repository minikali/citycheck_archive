import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { isMobile } from 'react-device-detect';
import './style.scss';

// eslint-disable-next-line arrow-body-style
const Map = () => {
  const defaultCenter = isMobile
    ? {
        lat: 50.3908794,
        lng: 17.5196905,
      }
    : {
        lat: 53.5347351,
        lng: 26.1799999,
      };
  const defaultZoom = isMobile ? 3 : 4;
  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>A pretty CSS3 popup.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
