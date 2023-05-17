import { GoogleMap, MarkerF, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useGetGeolocation } from "../hooks/useGetGeolocation";

export const Map = () => {
    const [position] = useGetGeolocation();
    const location = [{lat: 43, lng: 32}, {lat: 23, lng: 32}, {lat: 44, lng: 86}, {lat: 65, lng: 32}]

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
  return (
    <>
      <GoogleMap
          zoom={10}
          center={{lat: props.position.lat, lng: props.position.lng}}
          mapContainerClassName="h-40 w-60 border-2"
      >
        <MarkerF position={{lat: props.position.lat, lng: props.position.lng}} onClick={() => {console.log("hi")}}/>
        {props.location.map((location, i) => (
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