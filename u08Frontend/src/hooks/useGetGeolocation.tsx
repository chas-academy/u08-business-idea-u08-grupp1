import { useState } from "react";

export const useGetGeolocation = () => {
    const [data, setData] = useState([{lat: 0, lng: 0}, {status: ""}])
   
        if (!navigator.geolocation) {
            setData([{lat: 0, lng: 0}, {status: "Geolocation is not supported by your browser!"}]);
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
            setData([{lat: position.coords.latitude, lng: position.coords.longitude}, {status: ""}]);
            },
            () => {
                setData([{lat: 0, lng: 0}, {status: "Unable to retrieve your location"}]);
            }
        )   
    return data;
}