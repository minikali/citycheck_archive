import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMap, useMapEvents } from 'react-leaflet';
import { SuperclusterContext } from '@/context/SuperclusterContext';
import { GeojsonFeature, Project } from '@/types';

const useMarkers = () => {
  const { i18n } = useTranslation();
  const { supercluster } = useContext(SuperclusterContext);
  const [points, setPoints] = useState(null);
  const map = useMap();

  const getProjectsGeojson = async () => {
    try {
      const endpoint = `/${
        i18n.language === 'en' ? 'english-projects' : 'french-projects'
      }`;
      const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?valid=true&_limit=-1`;
      const response = await fetch(url);
      if (!response.ok) throw Error(response.statusText);
      const json = await response.json();
      // Transform data into GeoJSON Feature for supercluster
      const geojson: GeojsonFeature[] = json.map((element: Project) => ({
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
      supercluster.load(geojson);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const zoomOnCluster = (clusterId, position) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(clusterId),
      17
    );
    map.setView(position, expansionZoom, {
      animate: true,
    });
  };

  const updateCluster = () => {
    const newPoints = supercluster.getClusters(
      [
        map.getBounds().getWest(),
        map.getBounds().getSouth(),
        map.getBounds().getEast(),
        map.getBounds().getNorth(),
      ],
      map.getZoom()
    );
    // If points same as previous, do not set points again
    if (JSON.stringify(points) !== JSON.stringify(newPoints)) {
      setPoints(newPoints);
    }
  };

  useEffect(() => {
    (async () => {
      await getProjectsGeojson();
      updateCluster();
    })();
  }, []);

  useMapEvents({
    moveend: updateCluster,
  });

  return { points, zoomOnCluster };
};

export default useMarkers;
