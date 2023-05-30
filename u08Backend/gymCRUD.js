const Gym = require ("./gymSchema");

// GET ALL GYMS

exports.getAllGyms = async () => {
    const fetchedGyms = await Gym.find({});
    const gyms = fetchedGyms.map(data => {
        return {
            id: data.gymId,
            name: data.name,
            address: data.address,
            coordinates: {
                lat: data.lat,
                lng: data.lng
            },
            shortDescription: data.shortDescription,
            description: data.longDescription
        };
    });
    return gyms;
}

// GET GYM

exports.getGym = async (id) => {

    const gym = await Gym.findById(id);
    return gym;
}

// RATE GYM

// exports.rateGym = async (id, data) => {
 
//     const isRated = await Gym.findByIdAndUpdate(id, data, { new: true });
//     return isRated;
// }