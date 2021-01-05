import React from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import './style.scss';

interface Props {
  position: LatLngExpression;
  phase: number;
}

const SimpleMarker = ({ position, phase }: Props) => (
  <Marker
    position={position}
    icon={
      new DivIcon({
        className: `marker marker__phase-${phase}`,
        iconSize: [25, 40],
      })
    }
  />
);

export default SimpleMarker;
