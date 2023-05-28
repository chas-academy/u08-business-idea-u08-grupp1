import { useEffect, useState } from "react";

export const useGetDirections = (position: {lat: number, lng: number}, location: {lat: number, lng: number}) => {
  const [directionData, setDirectionData] = useState<any>();

  const getDirections = (origin: {lat: number, lng: number}, destination: {lat: number, lng: number}) => {
      const directionsService = new google.maps.DirectionsService();
      if (origin !== null && destination !== null) {
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirectionData(result)
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      } else {
        console.log('Please mark your destination in the map first!');
      } 
  };

  useEffect(() => {
    if(location.lat !== 0 && location.lng !== 0)
    getDirections(position, location);
  }, [position, location]);

  return [directionData];
}
