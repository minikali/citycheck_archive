/* eslint-disable camelcase */

export interface Project {
  address: string;
  author: string | null;
  created_at: string;
  description: string;
  english_project: any;
  id: number;
  lat: number;
  lng: number;
  phase: 1 | 2 | 3;
  project_confirmations: any[];
  project_history: any[];
  project_suggestion: any[];
  title: string;
  updated_at: string;
  valid: boolean;
  cluster: boolean;
  category: string;
}

export interface GeojsonProperty extends Project {
  cluster: boolean;
  category: string;
}

export interface GeojsonFeature {
  type: string;
  properties: GeojsonProperty;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}
