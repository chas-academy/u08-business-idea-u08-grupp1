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
    try {
        const gyms = await getAllGyms();
        res.status(200).json({
            gyms: gyms
        })
    } catch (error) {
        console.error("Unable to fetch gyms:", error);
        res.status(500).json({ error: "Failed to fetch gyms!" });
    }
})

// GET GYM ROUTE

app.get("/gyms/:gymId", async (req, res) => {
    try {
        const gym = await getGym(req.params.gymId);
        if (!gym) {
            return res.status(404).json({ error: "Gym not found..." });
        }
        res.status(200).json({
        gym: gym
        })
    } catch (error) {
        console.error("Error fetching gym:", error);
        res.status(500).json({ error: "Failed to fetch gym!" });
    }
    
})

// RATE GYM ROUTE

// app.put("/gyms/:gymId", async (req, res) => {
//     try {
//       const result = await rateGym(req.params.gymId, req.body);
//       if (!result) {
//         return res.status(404).json({ error: "Unable to rate gym..." });
//       }
//       res.status(200).json({ isRated: result });
//     } catch (error) {
//       console.error("Error rating gym:", error);
//       res.status(500).json({ error: "Failed to rate gym!." });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
