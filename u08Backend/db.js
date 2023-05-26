const mongoose = require ("mongoose");

const DB = "mongodb+srv://StockholmsUteGym:StockholmsUteGym@utegyms.io2jxzi.mongodb.net/gyms";
mongoose.connect(DB, { useNewUrlParser: true });
const dbCon = mongoose.connection;
dbCon.on("error", (err) => {
    console.error(`error: ${err}`);
})
dbCon.once("connected", (err, res) => {
    console.log("Connected to database...");
})