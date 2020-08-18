import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import { useFormikContext } from "formik";
import firebase from "firebase";

const Ubicacion = () => {
  const [center, setCenter] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);
  const { setFieldValue } = useFormikContext();
  
  useEffect(() => {
    if (markerPosition) {
      const geopoint = new firebase.firestore.GeoPoint(
        markerPosition.lat,
        markerPosition.lng
      );
      setFieldValue("ubicacion.latlng", geopoint);
    }
  }, [markerPosition]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMarkerPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "40vh",
  };

  const centerPlaHolder = {
    lat: -3.745,
    lng: -38.523,
  };

  const onClickMapHandler = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || centerPlaHolder}
        zoom={12}
        onClick={onClickMapHandler}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Ubicacion;