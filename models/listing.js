const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    Category: {
        type: String,
        required: true,
    },
    Description: String,
    Brand: String,
    image: {
      filename: {
        type: String,
        default: "default-filename"
      },
      url: {
        type: String,
        set: (v) =>
          v === ""
            ? "https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GM/gm2/gm-2100bb-1a/assets/GM-2100BB-1A.png.transform/main-visual-sp/image.png"
            : v
      }
    },        
    Price : Number,
    Strap_Type : String,
    Warranty : String, 
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;