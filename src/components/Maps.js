import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../store/map-slice";

const Maps = () => {
  const [map, setMap] = useState(null);

  const dispatch = useDispatch();

  const currentLocation = useSelector((state) => state.map.currentLocation);
  const toggleMapPan = useSelector((state) => state.map.toggleMap);

  if (toggleMapPan) {
    map.panTo(currentLocation);
    dispatch(mapActions.toggleMapPan());
  }

  return (
    <GoogleMap
      center={currentLocation}
      zoom={13}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={(map) => {
        setMap(map);
      }}
    >
      <MarkerF
        position={currentLocation}
        onClick={() => map.panTo(currentLocation)}
      />
    </GoogleMap>
  );
};

export default Maps;
