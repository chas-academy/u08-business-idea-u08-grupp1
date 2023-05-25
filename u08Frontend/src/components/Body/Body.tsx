import { useLoadScript } from "@react-google-maps/api";
import GymCards from "../GymCards/GymCards";
import { Map } from "../Map";

const Body = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    })
    if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return ( 
            <div>
                <Map />
                <h2 className="text-3xl text-center mb-7 mt-9 font-semibold">Gyms near you</h2>
                < GymCards />
                <p>More</p>
            </div>
        )
    }
}

export default Body;
