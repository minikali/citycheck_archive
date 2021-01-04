import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

interface Props {
  position: any;
  setPosition: (any) => void;
}

const DraggableMarker = ({ position, setPosition }: Props) => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

export default DraggableMarker;
