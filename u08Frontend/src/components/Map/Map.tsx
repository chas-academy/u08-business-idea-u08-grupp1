import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation";
import { useGetDirections } from "../../hooks/useGetDirections";
import { useEffect, useState } from "react";
import "./Map.css"
import axios, { AxiosResponse } from "axios";
import { useClickedCardStore } from "../../stores/useClickedCardStore";

export const Map = (props: { gyms: {
  id: number,
  name: string,
  address: string,
  distance: number,
  coordinates: { lat: number, lng: number },
  imageData: string,
  shortDescription: string,
  description: string,
}[] }) => {
  const [position] = useGetGeolocation();
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const [direction] = useGetDirections(position, destination);
  const [setId] = useClickedCardStore((state:any) => [state.setId]);

  const mapContainerStyle = {
    height:'100%'
  };

  if (!position.lat) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="map">
      <div className="mapContainer">
        <GoogleMap
          zoom={10}
          center={{ lat: position.lat, lng: position.lng }}
          mapContainerStyle={mapContainerStyle}
        >
          <MarkerF
            position={{ lat: position.lat, lng: position.lng }}
            onClick={() => {
              console.log("hi");
            }}
          />
          {props.gyms./*slice(0, 9).*/map((gym, i) => (
            <MarkerF
              key={i}
              position={gym.coordinates}
              onClick={() => {
                setDestination(gym.coordinates);
                setId(gym.id)
                console.log(gym.id)
              }}
            />
          ))}
          <DirectionsRenderer directions={direction} />
        </GoogleMap>
      </div>
      </div>
    );
  }
};

