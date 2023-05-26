const express = require ("express");
const cors = require ("cors");
const db = require ("./db");
const { getAllGyms, getGym, rateGym } = require("./gymCRUD");

const app = express();
const PORT = process.env.PORT || 4000;

// ################################# MIDDLEWARE #################################

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ################################# ROUTES #################################

// GET ALL GYMS

app.get("/gyms", async (req, res) => {
    const gyms = await getAllGyms();
    res.status(200).json({
            gyms: gyms
        })
})

// GET GYM ROUTE

app.get("/gyms/:gymId", async (req, res) => {
    const gym = await getGym(req.params.gymId);
    res.status(200).json({
        gym: gym
    })
})

// // RATE GYM ROUTE

// app.put("/gyms/:gymId", async (req, res) => {
//     const result = await rateGym(req.params.gymId, req.body);

//     res.status(200).json({
//     isRated: isRated
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
