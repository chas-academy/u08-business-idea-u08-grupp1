import { useLoadScript } from "@react-google-maps/api";
import GymCards from "../GymCards/GymCards";
import GroupCards from "../GroupCards/GroupCards";
import { Map } from "../Map/Map";
import "./Body.css";
import { useGetData } from "../../hooks/useGetData";

const Body = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const [data] = useGetData();
  if (!data.loaded || !isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="body">
        <div className="map">
            <Map gyms={data.gyms}/>
        </div>

        <GymCards gyms={data.gyms}/>
       
        <div>
        <GroupCards />
        </div>
        
      </div>
    );
  }
};

export default Body;
