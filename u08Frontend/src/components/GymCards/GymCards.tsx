import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./GymCards.css";
import { useClickedCardStore } from "../../stores/useClickedCardStore";

const GymCards = (props: { gyms: {
  id: number,
  name: string,
  address: string,
  distance: number,
  coordinates: { lat: number, lng: number },
  imageData: string,
  shortDescription: string,
  description: string,
}[] }) => {
  
  const [id, setId, setCoordinates] = useClickedCardStore((state: any) => [state.id, state.setId, state.setCoordinates]);
  // sets the ID of the gymCard when button is clicked and <dialog> is Open 
  const [gymCardOpen, setGymCardOpen] = useState(0);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const getDirections = (coordinates: {lat: number, lng: number}) => {
    setCoordinates(coordinates);
  };

  /* onClick={() => getDirections()} */ // onclick for popup button
  useEffect(() => {
    setGymCardOpen(id);
  }, [id]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="gymBody">
        <h2>Nearby Gyms</h2>
        <hr className="titleHR" />
        <div className="gymCardsBody">
          {props.gyms.map((gym, i) => (
            <div key={i} className="gymContainer">
             
            
              {gymCardOpen === gym.id && (
                <dialog open className="dialogBox">
                  <img src={`data:image/jpeg;base64,${gym.imageData}`} className="popupGymImage" alt="Utegym"/>
                  <h2 className="">{gym.name}</h2>
                  <h3 className="">Address: {gym.address}</h3>
                  <h3 className="">{gym.shortDescription}</h3>
                  <p>{gym.description}</p>
                  <h3 className="">Distance:{" "}{`${(gym.distance / 1000).toFixed(
                        1
                      )} km`}</h3>
                  <h3>Rating:</h3><img
                        src="/src/assets/images/5stars.png"
                        alt="Rating"
                        className="stars"
                      />
                  <button
                    className="directionsButton"
                    onClick={() => {getDirections(gym.coordinates); setGymCardOpen(0);}}
                  >
                    Get Directions
                  </button>
                  <button
                    className="closeButton"
                    onClick={() => {setGymCardOpen(0); setId(0);}}
                  >
                    Close
                  </button>
                </dialog>
              )}


              <div className="gymCardOuter">
                <div className="gymCardInner">
                  <div className="headerBlock">
                    <div className="gymImageBlock">
                      <img
                        src={`data:image/jpeg;base64,${gym.imageData}`}
                        className="gymImage"
                        alt="Utegym"
                      />
                    </div>

                    <div className="gymButton">
                      <button
                        className="button"
                        onClick={() => setGymCardOpen(gym.id)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                  <div className="gymName">
                    <h2 className="gymH2">{gym.name}</h2>
                  </div>

                  <div className="shortDescription">
                    <p>{gym.shortDescription}</p>
                  </div>

                  <hr className="gymHR" />

                  <div className="gymBottomBlock">
                    <div>
                      <h3 className="gymH3">{`${(gym.distance / 1000).toFixed(
                        1
                      )} km`}</h3>
                    </div>

                    <div className="gymRating">
                      <img
                        src="/src/assets/images/5stars.png"
                        alt="Rating"
                        className="stars"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default GymCards;
