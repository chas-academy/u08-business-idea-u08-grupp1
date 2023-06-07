import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useGetGeolocation } from "./useGetGeolocation";

export const useGetData = () => {
    const [positionGym] = useGetGeolocation();
    const [data, setData] = useState({ gyms: [{
        id: 1,
        name: "data.name",
        address: "data.address",
        distance: 32,
        coordinates: { lat: 0, lng: 0 },
        imageData: "images[index]",
        shortDescription: "data.shortDescription",
        description: "data.description",
      }], loaded: false});

  interface fetchGyms {
    id: number;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    shortDescription: string;
    description: string;
  }

  const getGyms = async (): Promise<fetchGyms[]> => {
    try {
      axios.defaults.headers.common["Origin"] = window.location.origin;

      const response: AxiosResponse<{ gyms: fetchGyms[] }> = await axios.get(
        "https://u08-business-idea-u08-grupp1-production.up.railway.app/gyms"
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
          result /*.slice(0, 9)*/
            .map((data) => getImage(data.id))
        );

        const gymsData = result
          .map((data, index) => {
            return {
              id: data.id,
              name: data.name,
              address: data.address,
              distance: calculateDistance(positionGym, data.coordinates),
              coordinates: data.coordinates,
              imageData: images[index],
              shortDescription: data.shortDescription,
              description: data.description,
            };
          })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 9);
        setData({ gyms: gymsData, loaded: true });
        
        console.log(data);
      });
    }
  }, [positionGym]);

  return [data];
}
