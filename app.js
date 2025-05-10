const express =require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');


const mongo_url="mongodb://127.0.0.1:27017/g-shock";
 

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('listings/home.ejs');  
});
  
  

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  });
  

 
app.get("/listings/new", (req, res) => {
    res.render("listings/new");     
  });
  
  
  app.get("/listings/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show", { listing });  
  });
  

 
app.post("/listings",async(req,res)=>{
  
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
});

 
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
 
  


// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         Category :"Luxury",
//         Description:"The metal bezel, finished in black ion plating, makes a chic, stylish statement about your design sense.",
//         Brand:"G-shock",
//         Image:"",
//         Price :100000,
//         Strap_Type : "Leather",
//         Warranty : "2-years",
//         Availability : " Out of Stock",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


app.listen(8080,()=>{
    console.log("server is running on port 8080");
});