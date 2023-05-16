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
  const location = [{lat: 43, lng: 32}, {lat: 23, lng: 32}, {lat: 44, lng: 86}, {lat: 65, lng: 32}]

  return (
    <>
      <h2>{position.status}</h2>
      <GoogleMap
          zoom={10}
          center={position.lat && position.lng ? {lat: position.lat, lng: position.lng} : {lat: 59.334591, lng: 18.063240}}
          mapContainerClassName="h-40 w-60 border-2"
      >
        <MarkerF position={position.lat && position.lng ? {lat: position.lat, lng: position.lng} : {lat: 59.334591, lng: 18.063240}} onClick={() => {console.log("hi")}}/>
        {location.map((location, i) => (
          <MarkerF key={i} position={location} onClick={() => {console.log("hi")}}/>
         ))}  
      </GoogleMap>
    </>
  )
}

/* 
<DirectionsRenderer
    directions={direction}
/>
*/