import React from "react";
import { LatLngExpression } from "leaflet";
import { Polygon } from "react-leaflet";

interface Props {
  positions:
    | null
    | LatLngExpression[]
    | LatLngExpression[][]
    | LatLngExpression[][][];
}

export default ({ positions }: Props) => {
  if (positions)
    return <Polygon positions={positions} color="#191970" fill={true} fillOpacity={0.1}/>;
  return <></>;
};
