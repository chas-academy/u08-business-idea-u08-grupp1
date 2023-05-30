const Gym = require ("./gymSchema");

// GET ALL GYMS

exports.getAllGyms = async () => {
    try{
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
    } catch (error) {
        console.log("Unable to fetch gyms...", error);
        throw new Error("Failed to fetch gyms!");
    }
}

// GET GYM

exports.getGym = async (id) => {
    try{
        const gym = await Gym.findById(id);    
        if (!gym) {
            throw new Error("Gym not found...")
        }
        return gym;
    } catch (error) {
        console.error("Unable to fetch gym!", error);
        throw error;
    }
}

// RATE GYM

// exports.rateGym = async (id, data) => {
//     try {
//       const isRated = await Gym.findByIdAndUpdate(id, data, { new: true });
//       if (!isRated) {
//         throw new Error("Unable to rate gym...");
//       }
//       return isRated;
//     } catch (error) {
//       console.error("Failed to rate gym!:", error);
//       throw error;
//     }
//   }