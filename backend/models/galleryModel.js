import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
      },
},{
    timestamps:true
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;