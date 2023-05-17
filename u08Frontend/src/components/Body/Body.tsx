import GymCards from "../GymCards/GymCards";

const Body = () => {
    return ( 
        <div>
            <img className="h-auto max-w-full mx-auto mb-7" src="/src/assets/images/stockholm.jpg" alt="map of Stockholm"/>
            <h2 className="text-3xl text-center mb-7 mt-9 font-semibold">Gyms near you</h2>
            < GymCards />
            <p>More</p>
        </div>
    )
}

export default Body;
