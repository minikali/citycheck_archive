// Libraries
import React from 'react';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

// Others
import config from '@/config';
import './style.scss';

interface Props {
  setMap: any;
  children: React.ReactNode;
}

const LeafletMap = ({ setMap, children }: Props) => (
  <MapContainer
    center={
        isMobile ? config.defaultCenterMobile : config.defaultCenterDesktop
      }
    zoom={isMobile ? config.defaultZoomMobile : config.defaultZoomDesktop}
    zoomControl={false}
    scrollWheelZoom={false}
    whenCreated={setMap}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <ZoomControl position='bottomright' />
    {children}
  </MapContainer>
  );

export default LeafletMap;
