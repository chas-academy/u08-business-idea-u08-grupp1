import { useLoadScript } from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation"; 
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';

const GymCards = () => {
  const [positionGym] = useGetGeolocation();
  const [gyms, setGyms] = useState([{}])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  })
  
  const gymsRaw = [{name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: {lat: 59.30458182177627, lng: 18.073813674583473}}, {name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: {lat: 59.30458182177627, lng: 18.073813674583473}}, {name: "Erikdals utegym", address: "Hammarby Slussväg 20", coordinates: {lat: 59.30458182177627, lng: 18.073813674583473}}];
 
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
    if(positionGym) {
      console.log(positionGym)
      const calculateDistance = (origin: {lat: number, lng: number}, destination: {lat: number, lng: number}) => {
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
          reject('Please mark your destination in the map first!');
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
            distance: distance,
          };
        });
        console.log(gymsData);
        setGyms(gymsData);
      })
      .catch(error => console.error(error));}
  }, [positionGym]);


  if (!isLoaded || !positionGym.lat) {
    return <div>Loading...</div>
  } else {
  return (
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
               <title>First star</title>
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
             </svg>
             <svg
               aria-hidden="true"
               className="w-5 h-5 text-yellow-300"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <title>Second star</title>
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
             </svg>
             <svg
               aria-hidden="true"
               className="w-5 h-5 text-yellow-300"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <title>Third star</title>
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
             </svg>
             <svg
               aria-hidden="true"
               className="w-5 h-5 text-yellow-300"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <title>Fourth star</title>
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
             </svg>
             <svg
               aria-hidden="true"
               className="w-5 h-5 text-yellow-300"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
             >
               <title>Fifth star</title>
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
             </svg>
             <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
               5.0
             </span>
           </div>
         </div>
 
         <div className="flex items-center justify-between px-3 pb-2">
           <span className="text-3xl font-bold text-gray-900 dark:text-white">
             {`${(gym.distance / 1000).toFixed(1)} km`}
           </span>
           <a
             href="#"
             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           >
             Read More
           </a>
         </div>
       </div>
      ))} 
    </div>
  );
}
};

export default GymCards;
