import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation";
import { useGetDirections } from "../../hooks/useGetDirections";
import { useState } from "react";
import "./Map.css"

export const Map = () => {
  const [position] = useGetGeolocation();
  const location = [
    { lat: 59.306668996308936, lng: 18.07325828184361 },
    { lat: 59.343450883376036, lng: 18.107933881057857 },
    { lat: 59.335222204218546, lng: 18.0478523972708 },
    { lat: 59.34161273436202, lng: 18.07085502249213 },
  ];

  if (!position.lat) {
    return <div>Loading...</div>;
  } else {
    return (
      <MapRender
        position={{ lat: position.lat, lng: position.lng }}
        location={location}
      />
    );
  }
};

const MapRender = (props: {
  position: { lat: number; lng: number };
  location: { lat: number; lng: number }[];
}) => {
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const [direction] = useGetDirections(props.position, destination);

  return (
    <div className="map">
    <div className="mapContainer">
      <GoogleMap
        zoom={10}
        center={{ lat: props.position.lat, lng: props.position.lng }}
        mapContainerClassName="h-96"
      >
        <MarkerF
          position={{ lat: props.position.lat, lng: props.position.lng }}
          onClick={() => {
            console.log("hi");
          }}
        />
        {props.location.map((location, i) => (
          <MarkerF
            key={i}
            position={location}
            onClick={() => {
              setDestination(location);
            }}
          />
        ))}
        <DirectionsRenderer directions={direction} />
      </GoogleMap>
    </div>
    </div>
  );
};
