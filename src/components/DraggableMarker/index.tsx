import React, { useMemo, useRef } from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import "./style.scss"
interface Props {
  position: any;
  setPosition: (any) => void;
  phase: number;
}

const DraggableMarker = ({ position, setPosition, phase }: Props) => {
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
      icon={
        new DivIcon({
          className: `marker marker__phase-${phase}`,
          iconSize: [25, 40],
        })
      }
    />
  );
};

export default DraggableMarker;
