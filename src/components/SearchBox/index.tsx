import React, { useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AsyncSelect from 'react-select/async';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
import debounce from 'debounce-promise';
import './style.scss';

interface Props {
  addr: any;
  setAddr: (v: any) => void;
  onFocus: () => void;
}

const SearchBox = ({ addr, setAddr, onFocus }: Props) => {
  const [show, setShow] = useState(false);
  const [provider] = useState(new OpenStreetMapProvider());
  const { t } = useTranslation();

  const fetchData = async (inputValue) => {
    try {
      const results = await provider.search({ query: inputValue });
      console.log('results', JSON.stringify(results));
      return results.map(({ label, x, y, bounds }) => ({
        label,
        bounds,
        position: { lat: x, lng: y },
      }));
    } catch (error) {
      console.log(error);
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

  const handleChange = (v) => {
    setAddr(v);
  };

  const LoadingIndicator = () => (
    <div className='loading-indicator'>
      <Spinner animation='border' />
    </div>
  );

  const defaultOptions = [
    {
      x: 2.3514616,
      y: 48.8566969,
      label: 'Paris, Île-de-France, France métropolitaine, France',
      bounds: [
        [48.8155755, 2.224122],
        [48.902156, 2.4697602],
      ],
      raw: {
        place_id: 256856867,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 7444,
        boundingbox: ['48.8155755', '48.902156', '2.224122', '2.4697602'],
        lat: '48.8566969',
        lon: '2.3514616',
        display_name: 'Paris, Île-de-France, France métropolitaine, France',
        class: 'boundary',
        type: 'administrative',
        importance: 0.9417101715588673,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: 2.320041027461107,
      y: 48.8588897,
      label: 'Paris, Île-de-France, France métropolitaine, France',
      bounds: [
        [48.8155755, 2.224122],
        [48.902156, 2.4697602],
      ],
      raw: {
        place_id: 256875254,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 71525,
        boundingbox: ['48.8155755', '48.902156', '2.224122', '2.4697602'],
        lat: '48.8588897',
        lon: '2.320041027461107',
        display_name: 'Paris, Île-de-France, France métropolitaine, France',
        class: 'boundary',
        type: 'administrative',
        importance: 0.9417101715588673,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -95.555513,
      y: 33.6617962,
      label: "Paris, Lamar County, Texas, 75460, États-Unis d'Amérique",
      bounds: [
        [33.6206345, -95.6279396],
        [33.7383866, -95.4354115],
      ],
      raw: {
        place_id: 256884150,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 115357,
        boundingbox: ['33.6206345', '33.7383866', '-95.6279396', '-95.4354115'],
        lat: '33.6617962',
        lon: '-95.555513',
        display_name:
          "Paris, Lamar County, Texas, 75460, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.6061645097134651,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -84.2529869,
      y: 38.2097987,
      label: "Paris, Bourbon County, Kentucky, 40361, États-Unis d'Amérique",
      bounds: [
        [38.164922, -84.307326],
        [38.238271, -84.232089],
      ],
      raw: {
        place_id: 256890839,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 130722,
        boundingbox: ['38.164922', '38.238271', '-84.307326', '-84.232089'],
        lat: '38.2097987',
        lon: '-84.2529869',
        display_name:
          "Paris, Bourbon County, Kentucky, 40361, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.5586843760767399,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: 2.320041027461107,
      y: 48.8588897,
      label: 'Paris, Île-de-France, France métropolitaine, France',
      bounds: [
        [48.8155755, 2.224122],
        [48.902156, 2.4697602],
      ],
      raw: {
        place_id: 257069089,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 1641193,
        boundingbox: ['48.8155755', '48.902156', '2.224122', '2.4697602'],
        lat: '48.8588897',
        lon: '2.320041027461107',
        display_name: 'Paris, Île-de-France, France métropolitaine, France',
        class: 'boundary',
        type: 'administrative',
        importance: 0.5383953917728153,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -88.3258578,
      y: 36.3019461,
      label: "Paris, Henry County, Tennessee, 38242, États-Unis d'Amérique",
      bounds: [
        [36.266003, -88.367113],
        [36.329016, -88.265067],
      ],
      raw: {
        place_id: 256917811,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 197171,
        boundingbox: ['36.266003', '36.329016', '-88.367113', '-88.265067'],
        lat: '36.3019461',
        lon: '-88.3258578',
        display_name:
          "Paris, Henry County, Tennessee, 38242, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.5250690427980547,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -87.6961374,
      y: 39.611146,
      label: "Paris, Edgar County, Illinois, 61944, États-Unis d'Amérique",
      bounds: [
        [39.581493, -87.721046],
        [39.649981, -87.649203],
      ],
      raw: {
        place_id: 256891065,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 126166,
        boundingbox: ['39.581493', '39.649981', '-87.721046', '-87.649203'],
        lat: '39.611146',
        lon: '-87.6961374',
        display_name:
          "Paris, Edgar County, Illinois, 61944, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.5244799592274194,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -70.500641,
      y: 44.259954,
      label: "Paris, Oxford County, Maine, 04271, États-Unis d'Amérique",
      bounds: [
        [44.239954, -70.520641],
        [44.279954, -70.480641],
      ],
      raw: {
        place_id: 492568,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'node',
        osm_id: 158824862,
        boundingbox: ['44.239954', '44.279954', '-70.520641', '-70.480641'],
        lat: '44.259954',
        lon: '-70.500641',
        display_name:
          "Paris, Oxford County, Maine, 04271, États-Unis d'Amérique",
        class: 'place',
        type: 'village',
        importance: 0.5190701377223524,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_place_village.p.20.png',
      },
    },
    {
      x: -93.7299173,
      y: 35.2920325,
      label: "Paris, Logan County, Arkansas, 72855, États-Unis d'Amérique",
      bounds: [
        [35.2681485, -93.761965],
        [35.3065882, -93.6755169],
      ],
      raw: {
        place_id: 257671572,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 6678712,
        boundingbox: ['35.2681485', '35.3065882', '-93.761965', '-93.6755169'],
        lat: '35.2920325',
        lon: '-93.7299173',
        display_name:
          "Paris, Logan County, Arkansas, 72855, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.5136706902956424,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
    {
      x: -92.0012811,
      y: 39.4808721,
      label: "Paris, Monroe County, Missouri, 65275, États-Unis d'Amérique",
      bounds: [
        [39.469158, -92.02148],
        [39.489278, -91.991679],
      ],
      raw: {
        place_id: 256896222,
        licence:
          'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
        osm_type: 'relation',
        osm_id: 140787,
        boundingbox: ['39.469158', '39.489278', '-92.02148', '-91.991679'],
        lat: '39.4808721',
        lon: '-92.0012811',
        display_name:
          "Paris, Monroe County, Missouri, 65275, États-Unis d'Amérique",
        class: 'boundary',
        type: 'administrative',
        importance: 0.4954384749221683,
        icon:
          'https://nominatim.openstreetmap.org/ui/mapicons//poi_boundary_administrative.p.20.png',
      },
    },
  ];

  return (
    <div className='search-box'>
      <AsyncSelect
        placeholder={t('enter_address')}
        value={addr}
        className='async-select'
        classNamePrefix='async-select'
        defaultOptions={defaultOptions}
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

export default SearchBox;
