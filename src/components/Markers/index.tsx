import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, LatLngBounds, LatLngLiteral } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import Supercluster from 'supercluster';

interface Props {
  zoom: number;
  setCenter: (obj: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

const Markers = ({ setCenter, setZoom, zoom }: Props) => {
  const { i18n } = useTranslation();
  const [bounds, setBounds] = useState<{
    ne: LatLngLiteral;
    sw: LatLngLiteral;
  }>(null);
  const [geoJson, setGeoJson] = useState(null);
  const [points, setPoints] = useState(null);
  const map = useMapEvents({
    moveend: () => {
      setBounds({
        ne: map.getBounds().getNorthEast(),
        sw: map.getBounds().getSouthWest(),
      });
    },
  });
  const supercluster = new Supercluster({
    radius: 20,
    maxZoom: 18,
    extent: 256,
  });
  const greenIcon = new Icon({
    iconUrl: 'assets/images/green-pin.png',
    iconSize: [20, 20],
  });
  const redIcon = new Icon({
    iconUrl: 'assets/images/red-pin.png',
    iconSize: [20, 20],
  });

  useEffect(() => {
    (async () => {
      try {
        const endpoint = `/${
          i18n.language === 'en' ? 'english-projects' : 'french-projects'
        }`;
        const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?valid=true&_limit=-1`;
        const response = await fetch(url);
        if (!response.ok) throw Error(response.statusText);
        const json = await response.json();
        // Transform data into GeoJSON Feature for supercluster
        const geojson = json.map((element) => ({
          type: 'Feature',
          properties: {
            ...element,
            cluster: false,
            category: 'pin',
          },
          geometry: {
            type: 'Point',
            coordinates: [element.lng, element.lat],
          },
        }));
        setGeoJson(geojson);
        supercluster.load(geojson);
        setPoints(
          supercluster.getClusters(
            [bounds.sw.lng, bounds.sw.lat, bounds.ne.lng, bounds.ne.lat],
            zoom
          )
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (bounds && geoJson) {
      supercluster.load(geoJson);
      setPoints(
        supercluster.getClusters(
          [bounds.sw.lng, bounds.sw.lat, bounds.ne.lng, bounds.ne.lat],
          zoom
        )
      );
    }
  }, [bounds, zoom]);

  useEffect(() => {
    console.log('points', points);
  }, [points]);

  return (
    <>
      {(points || []).map((element) => {
        const { properties, geometry } = element;
        if (properties.cluster)
          return (
            <Marker
              key={uuidv4()}
              position={[geometry.coordinates[1], geometry.coordinates[0]]}
              icon={greenIcon}
            />
          );
        return (
          <Marker
            key={uuidv4()}
            position={[geometry.coordinates[1], geometry.coordinates[0]]}
            icon={redIcon}
          />
        );
      })}
    </>
  );
};

export default Markers;
