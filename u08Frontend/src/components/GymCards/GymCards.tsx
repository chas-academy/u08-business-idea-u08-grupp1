import { useLoadScript } from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation";
import { useEffect, useState } from "react";
import "./GymCards.css";
import axios, { AxiosResponse } from "axios";

const GymCards = () => {
  const [positionGym] = useGetGeolocation();
  const [gyms, setGyms] = useState([{}]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const gymsRaw = [
    {
      name: "Erikdals utegym",
      address: "Hammarby Slussväg 20",
      coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 },
    },
    {
      name: "Erikdals utegym",
      address: "Hammarby Slussväg 20",
      coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 },
    },
    {
      name: "Erikdals utegym",
      address: "Hammarby Slussväg 20",
      coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 },
    },
  ];

  interface fetchGyms {
    id: number;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    shortDescription: string;
    longDescription: string;
  }

  const getGyms = async (): Promise<fetchGyms[]> => {
    try {
      axios.defaults.headers.common["Origin"] = window.location.origin;

      const response: AxiosResponse<{ gyms: fetchGyms[] }> = await axios.get(
        "http://localhost:4000/gyms"
      );
      const gyms: fetchGyms[] = response.data.gyms;
      console.log(gyms);
      return gyms;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getImage = async (id: number) => {
    const response = await fetch(
      `https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/${id}/image`
    );
    const jsonData = await response.json();
    return jsonData.data.attributes.base64Data;
  };

  useEffect(() => {
    if (positionGym.lat !== 0) {
      getGyms().then(async (result) => {
        console.log(positionGym);
        const calculateDistance = (
          origin: { lat: number; lng: number },
          destination: { lat: number; lng: number }
        ) => {
          const R = 6371e3; // metres
          const φ1 = (origin.lat * Math.PI) / 180; // φ, λ in radians
          const φ2 = (destination.lat * Math.PI) / 180;
          const Δφ = ((destination.lat - origin.lat) * Math.PI) / 180;
          const Δλ = ((destination.lng - origin.lng) * Math.PI) / 180;

          const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          const d = R * c; // in metres
          return d;
        };

        const images = await Promise.all(
          result.map((data) => getImage(data.id))
        );

        const gymsData = result.map((data, index) => {
          return {
            name: data.name,
            address: data.address,
            distance: calculateDistance(positionGym, data.coordinates),
            imageData: images[index],
            shortDescription: data.shortDescription,
            longDescription: data.longDescription,
          };
        });
        setGyms(gymsData);
        console.log(gyms);
      });
    }
  }, [positionGym]);

  if (!isLoaded || !positionGym.lat) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="gymBody">
        <h2>Nearby Gyms</h2>
        <hr className="titleHR" />
          <div className="gymCardsBody">
            {gyms.map((gym, i) => (
            <div key={i} className="gymContainer">
              <div className="gymCardOuter">
                <div className="gymCardInner">
                  <div className="headerBlock">
                    <div className="gymImageBlock">
                      <img src={`data:image/jpeg;base64,${gym.imageData}`} className="gymImage"alt="Utegym"/>
                    </div>
                    
                    <div className="gymButton">
                      <button className="button">Read More</button>
                    </div>
                  </div>

                  <div className="gymName">
                    <h2 className="gymH2">{gym.name}</h2>
                  </div>

                  <div className="shortDescription">
                    <p>
                      Lorem ipsum bla de blaops, here were are wrint some text that
                      could be from the database.
                    </p>
                  </div>

                  <hr className="gymHR" />

                  <div className="gymBottomBlock">
                    <div>
                      <h3 className="gymH3">{`${(gym.distance / 1000).toFixed(1)} km`}</h3>
                    </div>
              
                    <div className="gymRating">
                      <img src="/src/assets/images/5stars.png" alt="Rating" className="stars" />
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
