import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
     isActive: {
      type: Boolean,
      default: true,
    },
},{
    timestamps:true
});

const Product = mongoose.model("Product", productSchema);

export default Product;