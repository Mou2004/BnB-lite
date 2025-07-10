const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
  filename: String,
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&...etc",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&...etc"
        : v,
  },
},

  price: Number,
  location: String,
  country: String,
});


const listing = mongoose.model("listing", listingSchema);
module.exports = listing;