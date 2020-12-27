// Libraries
import React from 'react';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer } from 'react-leaflet';

// Components
import Markers from '@/components/Markers';

// Others
import config from '@/config';
import './style.scss';

const LeafletMap = () => (
  <MapContainer
    center={isMobile ? config.defaultCenterMobile : config.defaultCenterDesktop}
    zoom={isMobile ? config.defaultZoomMobile : config.defaultZoomDesktop}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <Markers />
  </MapContainer>
);

export default LeafletMap;
