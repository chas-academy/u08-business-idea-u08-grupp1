import { useLoadScript } from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation";
import { useEffect, useState } from "react";
import "./GymCards.css";
import axios, { AxiosResponse } from 'axios';

const GymCards = () => {
  const [positionGym] = useGetGeolocation();
  const [gyms, setGyms] = useState([{}]);
  const [selectedGym, setSelectedGym] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  const gymsRaw = [
    { name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 } },
    { name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 } },
    { name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: { lat: 59.30458182177627, lng: 18.073813674583473 } }
  ];

  interface fetchGyms {
    gymId: number;
    name: string;
    address: string;
    location: string;
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
    getGyms();
    if (positionGym) {
      console.log(positionGym)
      const calculateDistance = (origin: { lat: number, lng: number }, destination: { lat: number, lng: number }) => {
        const directionsService = new google.maps.DirectionsService();

        return new Promise((resolve, reject) => {
          if (origin !== null && destination !== null) {
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  resolve(result?.routes[0].legs[0].distance?.value);
                } else {
                  reject(`error fetching directions ${result}`);
                }
              }
            );
          } else {
            reject('Please mark your destination on the map first!');
          }
        });
      }

      const calculateDistances = gymsRaw.map(data => calculateDistance(positionGym, data.coordinates));

      Promise.all(calculateDistances)
        .then(distances => {
          const gymsData = distances.map((distance, index) => {
            return {
              name: gymsRaw[index].name,
              address: gymsRaw[index].address,
              distance: distance
            };
          });
          console.log(gymsData);
          setGyms(gymsData);
        })
        .catch();
    }
  }, [positionGym]);

  const openDialog = (gymName: string) => {
    setSelectedGym(gymName);
  };

  const closeDialog = () => {
    setSelectedGym(null);
  };

  if (!isLoaded || !positionGym.lat) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="gymBody">
        <h2>Nearby Gyms</h2>
        <hr />
        <div className="flex flex-wrap justify-center">
          {gyms.map((gym, i) => (
            <div key={i} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-5 mx-2">
              <div className="">
                <a href="#">
                  <img
                    className=" rounded-t-lg"
                    src="/src/assets/images/eriksdal.jpeg"
                    alt="product image"
                  />
                </a>
              </div>

              <div className="flex items-center justify-between">
                <div className="px-3 pb-5 pt-2">
                  <a href="#">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {gym.name}
                    </h3>
                    <h5 className="text-l tracking-tight text-gray-900 dark:text-white">
                      {gym.address}
                    </h5>
                  </a>
                </div>

                <div className="flex items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* star icons */}
                  </svg>
                  {/* remaining stars */}
                </div>
              </div>

              <div className="flex items-center justify-between px-3 pb-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {`${(gym.distance / 1000).toFixed(1)} km`}
                </span>
                <button
                  onClick={() => openDialog(gym.name)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read More
                </button>
              </div>

              {/* Dialog for gym details */}
              {selectedGym === gym.name && (
                <div className="popup">
                  <dialog open id="gym-dialog" className="gym-dialog">
                    <div>
                      <h2>{gym.name}</h2>
                      <p>Gym details go here...</p>
                      <button onClick={closeDialog}>Close</button>
                    </div>
                  </dialog>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default GymCards;