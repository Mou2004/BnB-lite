const mongoose = require("mongoose");
const listing = require("../models/listings.js");
const initdata = require("./data.js");

const url = "mongodb://127.0.0.1:27017/bnblite";


//if connected to db, then proceed with the .then() clause =>
main().then(()=>{
    console.log("database connected successfully!");
}).catch((err)=>{
    console.log(err);
})

//connecting to mongodb database is an asynscronous process
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/bnblite");
}

const initDatabase = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data initialized");
}
initDatabase();