import React from 'react';
import { DivIcon, LatLngTuple } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { Marker, Popup } from 'react-leaflet';
import useMarkers from '@/hooks/useMarkers';
import './style.scss';
import CardPopup from '@/components/CardPopup';

const Markers = () => {
  const { points, zoomOnCluster } = useMarkers();

  return (
    <>
      {(points || []).map((element) => {
        const { properties, geometry } = element;
        const position: LatLngTuple = [
          geometry.coordinates[1],
          geometry.coordinates[0],
        ];
        if (properties.cluster) {
          return (
            <Marker
              key={uuidv4()}
              position={position}
              icon={
                new DivIcon({
                  html: `<div>${properties.point_count}</div>`,
                  className: 'marker-cluster',
                })
              }
              eventHandlers={{
                click: () => {
                  zoomOnCluster(properties.cluster_id, position);
                },
              }}
            />
          );
        }
        return (
          <Marker
            key={uuidv4()}
            position={position}
            icon={
              new DivIcon({
                className: `marker marker__phase-${properties.phase}`,
                iconSize: [25, 40],
              })
            }
          >
            <CardPopup properties={properties} />
          </Marker>
        );
      })}
    </>
  );
};

export default Markers;
