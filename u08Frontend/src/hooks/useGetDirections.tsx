const useGetDirections = () => {
    const directionsService = new google.maps.DirectionsService();

    const origin = {lat: 32, lng: 45};
    const destination = {lat: 35, lng: 47};

    if (origin !== null && destination !== null) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirection(result)
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } else {
      console.log('Please mark your destination in the map first!');
    }
   
};