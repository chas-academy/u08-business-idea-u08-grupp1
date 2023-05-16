import { GoogleMap, MarkerF, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useGetGeolocation } from "../hooks/useGetGeolocation";

export const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    })

    if (!isLoaded) return <div>Loading...</div>;
    return <MapRender />;
}

const MapRender = () => {
  const [position] = useGetGeolocation();

  return (
    <>
        <h2>{position.status}</h2>
        <GoogleMap
            zoom={10}
            center={position.lat && position.lng ? {lat: position.lat, lng: position.lng} : {lat: 59.334591, lng: 18.063240}}
            mapContainerClassName="h-40 w-60"
        >
          <MarkerF position={position.lat && position.lng ? {lat: position.lat, lng: position.lng} : {lat: 59.334591, lng: 18.063240}} onClick={() => {console.log("hi")}}/>
          {[<MarkerF position={{lat: 34, lng: 76}} />, <MarkerF position={{lat: 23, lng: 43}} />, <MarkerF position={{lat: 55, lng: 22}}/>, <MarkerF position={{lat: 33, lng: 33}}/>]}  
        </GoogleMap>
    </>
  )
}

/* 
<DirectionsRenderer
    directions={direction}
/>
*/