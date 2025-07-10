const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listings.js")
const ejs = require("ejs");
const path = require("path");
const method_Override = require("method-override");
const ejsMate = require("ejs-mate");


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


// ejs-mate 
app.engine('ejs', ejsMate);

//setting ejs view engine

app.set("engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//css
app.use(express.static(path.join(__dirname,"public")));

//method override
app.use(express.urlencoded({extended: true})); // parsing the data from requests 
app.use(method_Override("_method"));





//index route
app.get("/listings",async (req,res)=>{
     
    const allListings = await listing.find({});
    
    res.render("listings/index.ejs", {allListings} );
    
});

//create route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
});

//save the new created listing
app.post("/listings" , async (req,res)=>{
    let formlisting = new listing(req.body.listing);
    await formlisting.save(); 
   res.redirect("/listings");
   console.log(formlisting);
})

//Show route
app.get("/listings/:id", async(req,res)=>{
    let { id } = req.params;
    const eachlisting = await listing.findById(id);
    res.render("listings/show.ejs",{ listing: eachlisting });
} );

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let { id } = req.params;
    const eachlisting = await listing.findById(id);
    res.render("listings/edit.ejs",{ listing: eachlisting });
});

//update route
app.put("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
});


//delete route
app.delete("/listings/:id", async (req,res) => {
    let { id } = req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});

app.get("/",(req,res)=> {
    res.send("respone here, this is a get request sent");
    console.log("respose sent");
})

app.listen(8080, ()=>{console.log("server is listening to port 8080");});