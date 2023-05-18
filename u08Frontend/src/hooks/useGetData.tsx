// useGetData hook for converting JSON data (north / east - long / lat).
import React, { useEffect, useState } from 'react';

// interface Gym {
//     id: number;
//     name: string;
//     // Add other properties as needed
// }

const apiURL = 'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter[servicetype.id]=122&page[limit]=1500&page[offset]=0&sort=name';

export const UseGetData = () => {

    const [gymData, setGymData] = useState([]);

    useEffect(() => {
        fetchGymLocations();
    }, []);

    //fetch gym locations
    async function fetchGymLocations() {
    try {
        const response = await fetch(apiURL);
        const responseJson = await response.json();
        const fetchedGymData = responseJson.data;

        setGymData(fetchedGymData);
        console.log(fetchedGymData);
        console.log(fetchedGymData[0].attributes.name);
        console.log(fetchedGymData[0].attributes.location);
        } catch (error) {
            console.error('Error fetching gym locations: ', error);
            return [];
            }
    }

    return (
        <>
            <h1>UseGetData</h1>
        </>
    )
}