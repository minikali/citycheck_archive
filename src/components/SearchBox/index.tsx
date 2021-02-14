import React, { useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import AsyncSelect from "react-select/async";
import Spinner from "react-bootstrap/Spinner";
import debounce from "debounce-promise";
import "./style.scss";

interface Props {
  addr: any;
  setAddr: (v: any) => void;
  onFocus?: () => void;
  placeholder?: string;
  init?: any;
}

const defaultProps = {
  onFocus: null,
  placeholder: "",
};

const SearchBox = ({ addr, setAddr, onFocus, placeholder, init }: Props) => {
  const [show, setShow] = useState(false);
  const [provider] = useState(new OpenStreetMapProvider());

  const fetchData = async (inputValue) => {
    try {
      const results = await provider.search({
        query: inputValue,
      });

      return results.map(({ label, x, y, bounds }) => ({
        label,
        bounds,
        position: { lat: y, lng: x },
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const loadOptions = (inputValue) => {
    if (inputValue.length < 3) return [];
    return new Promise((resolve) => {
      resolve(fetchData(inputValue));
    });
  };

  const loadOptionsDebounce = debounce(loadOptions, 1000, {
    leading: true,
  });

  const handleInputChange = (v: string) => {
    if (v?.length > 2) setShow(true);
    else setShow(false);
  };

  const getGeoJson = async (address) => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const addressDetails = 1;
      const format = "geojson";
      const limit = 1;
      const polygonGeojson = 1;
      const viewbox = [
        -15.117187500000002,
        68.84766505841037,
        67.50000000000001,
        29.6880527498568,
      ].join(",");
      const uri =
        `https://nominatim.openstreetmap.org/` +
        `?addressdetails=${addressDetails}` +
        `&q=${encodedAddress}` +
        `&format=${format}` +
        `&limit=${limit}` +
        `&polygon_geojson=${polygonGeojson}` +
        `&viewbox=${viewbox}`;
      const response = await fetch(uri, {
        method: "GET",
        redirect: "follow",
      });
      const json = await response.json();
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

  const handleChange = async (v) => {
    if (v) {
      const response = await getGeoJson(v.label);
      if (response) {
        const geometry = formatGeometry(response.geometry);

        setAddr({ ...v, geometry });
      } else {
        setAddr(v);
      }
    } else {
      setAddr(null);
    }
  };

  useEffect(() => {
    if (init) {
      handleChange(init);
    }
  }, []);

  const LoadingIndicator = () => (
    <div className="loading-indicator">
      <Spinner animation="border" />
    </div>
  );

  return (
    <div className="search-box">
      <AsyncSelect
        placeholder={placeholder}
        value={addr}
        className="async-select"
        classNamePrefix="async-select"
        loadOptions={(inputValue) => loadOptionsDebounce(inputValue)}
        cacheOptions
        onChange={handleChange}
        isClearable
        onInputChange={handleInputChange}
        menuIsOpen={show}
        components={{ LoadingIndicator }}
        onFocus={onFocus}
      />
    </div>
  );
};

SearchBox.defaultProps = defaultProps;
export default SearchBox;
