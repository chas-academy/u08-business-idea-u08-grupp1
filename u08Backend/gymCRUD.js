const Gym = require ("./gymSchema");

// GET ALL GYMS

exports.getAllGyms = async () => {
    const gyms = await Gym.find({});
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