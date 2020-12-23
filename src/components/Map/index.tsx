import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { isMobile } from 'react-device-detect';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import config from '@/config';
import './style.scss';
import Markers from '../Markers';

const LeafletMap = () => {
  const { t, i18n } = useTranslation();
  const [center, setCenter] = useState(
    isMobile ? config.defaultCenterMobile : config.defaultCenterDesktop
  );
  const [zoom, setZoom] = useState(
    isMobile ? config.defaultZoomMobile : config.defaultZoomDesktop
  );
  const greenIcon = new Icon({ iconUrl: 'assets/images/green-pin.png' });

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Markers setCenter={setCenter} setZoom={setZoom} zoom={zoom} />
      {/* <Marker position={[51.505, -0.09]} icon={greenIcon}>
        <Popup>
          <div className='popup-content'>Hello world</div>
        </Popup>
        <Tooltip opacity={1} permanent>
          <span>Hello guys</span>
        </Tooltip>
      </Marker> */}
    </MapContainer>
  );
};

export default LeafletMap;
