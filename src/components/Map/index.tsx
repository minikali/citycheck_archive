// Libraries
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { MapContainer, TileLayer } from 'react-leaflet';

// Components
import SearchBox from '@/components/SearchBox';
import Markers from '@/components/Markers';

// Others
import config from '@/config';
import './style.scss';

const LeafletMap = () => {
  const [addr, setAddr] = useState();
  const [map, setMap] = useState(null);

  const handleAddr = (v) => {
    setAddr(v);
    if (v) {
      map.fitBounds(v.bounds);
    }
  };

  return (
    <div className='position-relative'>
      <SearchBox addr={addr} setAddr={handleAddr} />
      <MapContainer
        center={
          isMobile ? config.defaultCenterMobile : config.defaultCenterDesktop
        }
        zoom={isMobile ? config.defaultZoomMobile : config.defaultZoomDesktop}
        zoomControl={false}
        whenCreated={(m) => setMap(m)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Markers />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
