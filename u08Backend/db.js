const mongoose = require ("mongoose");

const DB = "mongodb://localhost:27017/gyms";
mongoose.connect(DB, { useNewUrlParser: true });
const dbCon = mongoose.connection;
dbCon.on("error", (err) => {
    console.error(`error: ${err}`);
})
dbCon.once("connected", (err, res) => {
    console.log("Connected to database...");
})