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
    return <div className="body">
      <h2 className="PBh2">Website is Loading</h2>
      <hr className="titleHR"/>
      <p className="about-Us">Please be patient as SWC fetches your current location and calcualtes the nearest utegym to you</p>
      <div>
        <GroupCards />
      </div>
      </div>;
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
