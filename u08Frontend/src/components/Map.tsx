import { GoogleMap, MarkerF, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useGetGeolocation } from "../hooks/useGetGeolocation";
import { useGetDirections } from "../hooks/useGetDirections";
import { useState } from "react";

export const Map = () => {
    const [position] = useGetGeolocation();
    const location = [{lat: 57.7089, lng: 11.9746}, {lat: 65.88557, lng: 14.5156}, {lat: 44, lng: 86}, {lat: 65, lng: 32}]

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    })

    if (!isLoaded || !position.lat) {
      return <div>Loading...</div>
    } else {
      return <MapRender position={{lat: position.lat, lng: position.lng}} location={location}/>
    }
}

const MapRender = (props: { position: { lat: number; lng: number; }; location: {lat: number, lng: number}[]; }) => {
  const [destination, setDestination] = useState({lat: 0, lng: 0})
  const [direction] = useGetDirections(props.position, destination);

  return (
    <>
      <GoogleMap
        zoom={10}
        center={{lat: props.position.lat, lng: props.position.lng}}
        mapContainerClassName="h-40 w-60 border-2"
      >
        <MarkerF position={{lat: props.position.lat, lng: props.position.lng}} onClick={() => {console.log("hi")}}/>
        {props.location.map((location, i) => (
          <MarkerF key={i} position={location} onClick={() => {setDestination(location)}}/>
         ))}  
        <DirectionsRenderer
          directions={direction}
        />
      </GoogleMap>
    </>
  )
}



