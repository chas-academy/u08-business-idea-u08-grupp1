import { useEffect, useState } from "react";

export const useGetGeolocation = () => {
    const [data, setData] = useState([{lat: 0, lng: 0, status: ""}])

    const getLocation = () => {
            if (!navigator.geolocation) {
                setData([{lat: 59.334591, lng: 18.063240, status: "Geolocation is not supported by your browser!"}]);
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                setData([{lat: position.coords.latitude, lng: position.coords.longitude, status: ""}]);
                },
                () => {
                    setData([{lat: 59.334591, lng: 18.063240, status: "Unable to retrieve your location"}]);
                }
            )   
    }

    useEffect(() => {
        getLocation();
    }, []);
    
    return data;
}