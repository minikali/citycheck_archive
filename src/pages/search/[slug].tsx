import React from "react";
import Page from "../index";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export const getServerSideProps = async ({ query }) => {
  const { slug } = query;

  //   const provider = new OpenStreetMapProvider();

  const getGeoJson = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const addressDetails = 1;
      const format = "json";
      const limit = 1;
      const polygonGeojson = 1;
      const viewbox = [
        -15.117187500000002,
        68.84766505841037,
        67.50000000000001,
        29.6880527498568,
      ].join(",");
      const uri =
        `https://nominatim.openstreetmap.org/search` +
        `?addressdetails=${addressDetails}` +
        `&q=${encodedQuery}` +
        `&format=${format}` +
        `&limit=${limit}` +
        `&polygon_geojson=${polygonGeojson}` +
        `&viewbox=${viewbox}`;
      const response = await fetch(uri, {
        method: "GET",
        redirect: "follow",
      });
      const json = await response.json();
      return json;
      if (!response.ok) throw new Error(json);
      return json.features.length > 0 ? json.features[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const invertLatLng = (arrLatLng) => arrLatLng.map(([lng, lat]) => [lat, lng]);

  const formatGeometry = ({ type, coordinates }) => {
    if (type === "Polygon")
      return {
        type,
        coordinates: coordinates.map((polygon) => invertLatLng(polygon)),
      };
    else if (type === "MultiPolygon")
      return {
        type,
        coordinates: coordinates.map((polygons) =>
          polygons.map((polygon) => invertLatLng(polygon))
        ),
      };
    else return null;
  };

  //   const fetchData = async (inputValue) => {
  //     try {
  //       const results = await provider.search({
  //         query: inputValue,
  //       });

  //       return results.map(({ label, x, y, bounds }) => ({
  //         label,
  //         bounds,
  //         position: { lat: y, lng: x },
  //       }));
  //     } catch (error) {
  //       console.error(error);
  //       return [];
  //     }
  //   };

  const response = await getGeoJson(slug);
  if (response?.length > 0) {
    // const geometry = formatGeometry(response[0].geojson);

    const floatbbox = response[0].boundingbox.map((str) => parseFloat(str));
    const bounds = [
      [floatbbox[0], floatbbox[2]],
      [floatbbox[1], floatbbox[3]],
    ];
    return {
      props: {
        address: {
          label: response[0].display_name,
          bounds,
          position: {
            lat: parseFloat(response[0].lat),
            lng: parseFloat(response[0].lon),
          },
          //   ...geometry
        },
        // address: response
      },
    };
  }

  return { props: {} };
};

export default Page;
