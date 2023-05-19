// useGetData hook for converting JSON data (north / east - long / lat).
/* import React, { useEffect, useState } from 'react';
import MarkerF from './MarkerF'; 

const apiURL = 'https://apigw.stockholm.se/NoAuth/VirtualhittaserviceDMZ/Rest/serviceunits?&filter%5Bservicetype.id%5D=122&page%5Blimit%5D=1500&page%5Boffset%5D=0&sort=name';

//fetch gym locations
async function fetchGymLocations() {
    try {
        const response = await fetch(apiURL);
        const responseJson = await response.json();
        const gymData = responseJson.data;

        //get names and positions
        const gyms = gymData.map((gym) => { //man behöver deklarera gym
            const gymName = gym.attributes.name;
            const position = {
                latitude: gym.attributes.location.north,
                longitude: gym.attributes.location.east
            };
            return { gymName, position};
        });
        return gyms;
    } catch (error) {
        console.error('Error fetching gym locations: ', error);
        return [];
    }
} */
