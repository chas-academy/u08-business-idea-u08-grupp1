import { useLoadScript } from "@react-google-maps/api";
import GymCards from "../GymCards/GymCards";
import GroupCards from "../GroupCards/GroupCards";
import { Map } from "../Map/Map";
import "./Body.css";

const Body = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="body">
        <div className="map">
            <Map />
        </div>

        <GymCards />
       
        <div>
        <GroupCards />
        </div>
        
      </div>
    );
  }
};

export default Body;
