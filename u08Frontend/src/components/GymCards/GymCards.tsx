import { useLoadScript } from "@react-google-maps/api";
import { useGetGeolocation } from "../../hooks/useGetGeolocation"; 
import { useEffect, useState } from "react";
import "./GymCards.css";
import axios, { AxiosResponse } from 'axios';


const GymCards = () => {
  const [positionGym] = useGetGeolocation();
  const [gyms, setGyms] = useState([{}])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  })
 
  interface fetchGyms {
    id: number;
    name: string;
    address: string;
    coordinates: {lat: number, lng: number};
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

  const getImage = async (id: number) => {
    const response = await fetch(`https://apigw.stockholm.se/noauth/virtualhittaservicedmz/rest/serviceunits/${id}/image`);
    const jsonData = await response.json();
    return jsonData.data.attributes.base64Data;
  }
  
  useEffect(() => {
    if(positionGym.lat !== 0) {
      getGyms().then(async result => {
        console.log(positionGym)
        const calculateDistance = (origin: {lat: number, lng: number}, destination: {lat: number, lng: number}) => {
        
        const R = 6371e3; // metres
        const φ1 = origin.lat * Math.PI/180; // φ, λ in radians
        const φ2 = destination.lat * Math.PI/180;
        const Δφ = (destination.lat-origin.lat) * Math.PI/180;
        const Δλ = (destination.lng-origin.lng) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
        return d;
      }

      const images = await Promise.all(result.slice(0, 9).map(data => getImage(data.id)));

      const gymsData = result.slice(0, 9).map((data, index) => {
          return {
            name: data.name,
            address: data.address,
            distance: calculateDistance(positionGym, data.coordinates),
            imageData: images[index]
          }
      })
      setGyms(gymsData)
      console.log(gyms)
    });
  }
}, [positionGym]);


  if (!isLoaded || !positionGym.lat) {
    return <div>Loading...</div>
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
               src={`data:image/jpeg;base64,${gym.imageData}`}
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
    </div>
  );
}
};

export default GymCards;
