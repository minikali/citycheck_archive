// Libraries
import React, { useRef, useState } from 'react';
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
  const mapRef = useRef(null);
  const handleAddr = (v) => {
    setAddr(v);
    if (v) {
      map.fitBounds(v.bounds);
    }
  };

  const handleWhenCreated = (m) => {
    setMap(m);
  };

  const handleSearchboxFocus = () => {
    window.scrollTo(0, mapRef.current.offsetTop - 10);
  };

  return (
    <div ref={mapRef} className='position-relative'>
      <SearchBox
        addr={addr}
        setAddr={handleAddr}
        onFocus={handleSearchboxFocus}
      />
      <MapContainer
        center={
          isMobile ? config.defaultCenterMobile : config.defaultCenterDesktop
        }
        zoom={isMobile ? config.defaultZoomMobile : config.defaultZoomDesktop}
        zoomControl={false}
        whenCreated={handleWhenCreated}
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
