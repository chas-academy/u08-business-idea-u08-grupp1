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

export const Map = () => {
  const [position] = useGetGeolocation();

  if (!position.lat) {
    return <div>Loading...</div>;
  } else {
    return (
      <MapRender
        position={{ lat: position.lat, lng: position.lng }}
      />
    );
  }
};

const MapRender = (props: {
  position: { lat: number; lng: number };
}) => {
  const [destination, setDestination] = useState({ lat: 0, lng: 0 });
  const [direction] = useGetDirections(props.position, destination);
  const [gyms, setGyms] = useState([{}]);

  const mapContainerStyle = {
    height:'100%'
  };

  interface fetchGyms {
    id: number;
    name: string;
    address: string;
    coordinates: {lat: number, lng: number};
    shortDescription: string;
    longDescription: string;
  }

  const getGyms = async (): Promise<fetchGyms[]> => {
    try {
      axios.defaults.headers.common['Origin'] = window.location.origin;

      const response: AxiosResponse<{ gyms: fetchGyms[] }> = await axios.get('http://localhost:4000/gyms');
      const gyms: fetchGyms[] = response.data.gyms;
      console.log(gyms);
      return gyms;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  
  useEffect(() => {
    getGyms().then(async result => {

    const gymsData = result.map((data) => {
        return {
          id: data.id,
          coordinates: data.coordinates,
        }
    })
    setGyms(gymsData)
    console.log(gyms)
  });
  
}, []);

  return (
    <div className="map">
    <div className="mapContainer">
      <GoogleMap
        zoom={10}
        center={{ lat: props.position.lat, lng: props.position.lng }}
        mapContainerStyle={mapContainerStyle}
      >
        <MarkerF
          position={{ lat: props.position.lat, lng: props.position.lng }}
          onClick={() => {
            console.log("hi");
          }}
        />
        {gyms.slice(0, 9).map((gym, i) => (
          <MarkerF
            key={i}
            position={gym.coordinates}
            onClick={() => {
              setDestination(gym.coordinates);
            }}
          />
        ))}
        <DirectionsRenderer directions={direction} />
      </GoogleMap>
    </div>
    </div>
  );
};
