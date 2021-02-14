import React from "react";
import { DivIcon, LatLngTuple } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import { Marker } from "react-leaflet";
import useMarkers from "@/hooks/useMarkers";
import CardPopup from "@/components/CardPopup";
import "./style.scss";

interface Props {
  map: any;
}

const Markers = ({ map }: Props) => {
  const { points, zoomOnCluster } = useMarkers();

  return (
    <>
      {(points || []).map((element) => {
        const { properties, geometry } = element;
        const position: LatLngTuple = [
          geometry.coordinates[1],
          geometry.coordinates[0],
        ];
        // Cluster
        if (properties.cluster) {
          return (
            <Marker
              key={uuidv4()}
              position={position}
              icon={
                new DivIcon({
                  html: `<div>${properties.point_count}</div>`,
                  className: "marker-cluster",
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
        // Pin marker
        return (
          <Marker
            key={uuidv4()}
            position={position}
            // riseOnHover
            icon={
              new DivIcon(
                map?.getZoom() > 14
                  ? {
                      html: `<div>${properties.title}</div><span class="tip"></span>`,
                      className: `marker-label marker-label__phase-${properties.phase}`,
                    }
                  : {
                      className: `marker marker__phase-${properties.phase}`,
                      iconSize: [25, 40],
                    }
              )
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
